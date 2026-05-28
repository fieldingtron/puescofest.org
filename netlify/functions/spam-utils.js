/**
 * Spam detection utilities for the PuescoFest contact form.
 *
 * Layers:
 *  1. Gibberish detection (consonant/vowel ratio, random-char patterns)
 *  2. Timing check (form submitted too quickly)
 *  3. Email heuristics (excessive dots, disposable patterns)
 *  4. Rate limiting by IP (in-memory, 60 s cooldown)
 *  5. Aggregate spam score — each layer contributes a weighted score;
 *     only submissions exceeding the combined threshold are blocked.
 */

// ---------------------------------------------------------------------------
// 1. Gibberish detection
// ---------------------------------------------------------------------------

const VOWELS = new Set("aeiouáéíóúAEIOUÁÉÍÓÚ");

/**
 * Returns a score 0–1 indicating how "gibberish" a string looks.
 * Higher = more likely gibberish.
 */
function gibberishScore(text) {
  if (!text || text.length < 3) return 0;

  const letters = text.replace(/[^a-záéíóúA-ZÁÉÍÓÚ]/g, "");
  if (letters.length < 3) return 0;

  // --- consonant-to-vowel ratio ---
  let vowelCount = 0;
  let maxConsecutiveConsonants = 0;
  let currentConsonantRun = 0;

  for (const ch of letters) {
    if (VOWELS.has(ch)) {
      vowelCount++;
      currentConsonantRun = 0;
    } else {
      currentConsonantRun++;
      if (currentConsonantRun > maxConsecutiveConsonants) {
        maxConsecutiveConsonants = currentConsonantRun;
      }
    }
  }

  const vowelRatio = vowelCount / letters.length; // healthy text ≈ 0.35-0.45

  // --- mixed-case randomness (e.g. "nwuzJoFWlYsYSIyN") ---
  let caseFlips = 0;
  for (let i = 1; i < letters.length; i++) {
    const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase();
    const currUpper = letters[i] === letters[i].toUpperCase();
    if (prevUpper !== currUpper) caseFlips++;
  }
  const caseFlipRatio = caseFlips / (letters.length - 1);

  // --- no spaces / word separators in a long string ---
  const words = text.trim().split(/\s+/);
  const avgWordLength = text.replace(/\s/g, "").length / words.length;

  let score = 0;

  // Very low vowel ratio → likely random consonant soup
  if (vowelRatio < 0.2) score += 0.35;
  else if (vowelRatio < 0.25) score += 0.2;

  // Long runs of consonants (> 4 in a row is unusual in Spanish/English)
  if (maxConsecutiveConsonants >= 5) score += 0.25;
  else if (maxConsecutiveConsonants >= 4) score += 0.1;

  // Excessive case flipping (normal text rarely exceeds 0.15)
  if (caseFlipRatio > 0.4) score += 0.25;
  else if (caseFlipRatio > 0.25) score += 0.1;

  // Single very long "word" with no spaces
  if (avgWordLength > 12 && words.length === 1) score += 0.15;

  return Math.min(score, 1);
}

// ---------------------------------------------------------------------------
// 2. Timing check
// ---------------------------------------------------------------------------

const MIN_SUBMIT_TIME_MS = 3000; // 3 seconds

/**
 * Returns true if the form was submitted suspiciously fast.
 */
function isTooFast(renderTimestamp) {
  if (!renderTimestamp) return false; // can't check without a timestamp
  const elapsed = Date.now() - Number(renderTimestamp);
  return elapsed < MIN_SUBMIT_TIME_MS;
}

// ---------------------------------------------------------------------------
// 3. Email heuristics
// ---------------------------------------------------------------------------

/**
 * Returns a score 0–1 for how suspicious the email looks.
 */
function suspiciousEmailScore(email) {
  if (!email) return 0;

  let score = 0;
  const [localPart] = email.split("@");

  // Excessive dots in local part (like p.i.m.o.biy.ova.1.7)
  const dotCount = (localPart.match(/\./g) || []).length;
  if (dotCount > 4) score += 0.4;
  else if (dotCount > 3) score += 0.2;

  // Gibberish local part
  const localGibberish = gibberishScore(localPart.replace(/\./g, ""));
  score += localGibberish * 0.4;

  return Math.min(score, 1);
}

// ---------------------------------------------------------------------------
// 4. Rate limiting (in-memory per IP, with auto-cleanup)
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60_000; // 60 seconds
const rateLimitMap = new Map(); // ip -> timestamp

// Clean up stale entries every 5 minutes to prevent memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, ts] of rateLimitMap) {
    if (now - ts > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref(); // .unref() so it doesn't keep the process alive

/**
 * Returns true if this IP has submitted within the cooldown window.
 * Also records the current submission.
 */
function isRateLimited(ip) {
  if (!ip) return false;
  const last = rateLimitMap.get(ip);
  const now = Date.now();

  if (last && now - last < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimitMap.set(ip, now);
  return false;
}

// ---------------------------------------------------------------------------
// 5. Aggregate spam check
// ---------------------------------------------------------------------------

const SPAM_THRESHOLD = 0.5;

/**
 * Runs all spam checks and returns { isSpam, score, reasons }.
 *
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.message
 * @param {string} params.honeypot
 * @param {number|string} params.renderTimestamp
 * @param {string} params.ip
 */
function checkSpam({ name, email, message, honeypot, renderTimestamp, ip }) {
  const reasons = [];
  let score = 0;

  // Honeypot (instant reject)
  if (honeypot) {
    return { isSpam: true, score: 1, reasons: ["honeypot"] };
  }

  // Rate limiting (instant reject)
  if (isRateLimited(ip)) {
    return { isSpam: true, score: 1, reasons: ["rate_limited"] };
  }

  // Timing
  if (isTooFast(renderTimestamp)) {
    score += 0.4;
    reasons.push("too_fast");
  }

  // Gibberish in name
  const nameScore = gibberishScore(name);
  if (nameScore > 0.3) {
    score += nameScore * 0.5;
    reasons.push(`gibberish_name(${nameScore.toFixed(2)})`);
  }

  // Gibberish in message
  const msgScore = gibberishScore(message);
  if (msgScore > 0.3) {
    score += msgScore * 0.4;
    reasons.push(`gibberish_message(${msgScore.toFixed(2)})`);
  }

  // Suspicious email
  const emailScore = suspiciousEmailScore(email);
  if (emailScore > 0.2) {
    score += emailScore * 0.3;
    reasons.push(`suspicious_email(${emailScore.toFixed(2)})`);
  }

  return {
    isSpam: score >= SPAM_THRESHOLD,
    score: Math.round(score * 100) / 100,
    reasons,
  };
}

module.exports = { checkSpam, gibberishScore, suspiciousEmailScore };
