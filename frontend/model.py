#!/usr/bin/env python3
"""
Model API Tester — Gemini + OpenRouter
Tests all models with a heavy trip planning prompt.
Outputs a working model list at the end.
"""

import os
import json
import time
import asyncio
import aiohttp
from datetime import datetime

# ─────────────────────────────────────────────
# CONFIG — fill these in or set as env vars
# ─────────────────────────────────────────────

GEMINI_API_KEYS = [
    os.getenv("GEMINI_API_KEY_1", ""),
    os.getenv("GEMINI_API_KEY_2", ""),
    os.getenv("GEMINI_API_KEY_3", ""),
]

OPENROUTER_API_KEYS = [
    os.getenv("OPENROUTER_API_KEY_1", ""),
    os.getenv("OPENROUTER_API_KEY_2", ""),
]

GEMINI_MODELS = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
    "gemini-2.5-flash-preview-05-20",
    "gemini-2.5-pro-preview-05-06",
]

OPENROUTER_MODELS = [
    "google/gemini-2.0-flash-001",
    "google/gemini-flash-1.5",
    "google/gemini-pro-1.5",
    "meta-llama/llama-3.3-70b-instruct",
    "meta-llama/llama-3.1-8b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "mistralai/mistral-small-3.1-24b-instruct:free",
    "deepseek/deepseek-chat-v3-0324:free",
    "deepseek/deepseek-r1:free",
    "qwen/qwen3-8b:free",
    "qwen/qwen3-14b:free",
    "qwen/qwen3-32b:free",
    "microsoft/phi-4-reasoning:free",
    "openai/gpt-4o-mini",
    "anthropic/claude-3-haiku",
    "nousresearch/hermes-3-llama-3.1-70b:free",
    "thudm/glm-4-32b:free",
]

TIMEOUT_SECONDS = 30

# ─────────────────────────────────────────────
# HEAVY PROMPT
# ─────────────────────────────────────────────

HEAVY_PROMPT = """You are an expert travel planner. Plan a detailed 30-day trip to America for a group of 4 people (2 adults, 2 teenagers) from India. 

Budget: ₹8,00,000 total (approximately $9,600 USD).

Requirements:
- Cover at least 8 major cities/regions
- Include day-wise itinerary for all 30 days
- Include accommodation recommendations with estimated costs
- Include must-see attractions, local food experiences, transport options
- Include visa tips, best time to visit each city, weather considerations
- Include budget breakdown: flights, hotels, food, activities, transport
- Include packing suggestions for American weather in different regions
- Flag any safety tips for Indian tourists

Respond ONLY in valid JSON with this structure:
{
  "trip_title": "...",
  "total_days": 30,
  "cities": ["city1", "city2", ...],
  "budget_breakdown": {
    "flights": 0,
    "accommodation": 0,
    "food": 0,
    "activities": 0,
    "transport": 0,
    "misc": 0
  },
  "days": [
    {
      "day": 1,
      "city": "...",
      "activities": ["activity1", "activity2"],
      "accommodation": "hotel name + cost",
      "food": "recommended meal + cost",
      "transport": "how to get around",
      "estimated_daily_cost": 0
    }
  ],
  "visa_tips": "...",
  "packing_tips": "...",
  "safety_tips": "..."
}"""

# ─────────────────────────────────────────────
# COLORS
# ─────────────────────────────────────────────

GREEN  = "\033[92m"
RED    = "\033[91m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

def ok(msg):    print(f"  {GREEN}✓{RESET} {msg}")
def fail(msg):  print(f"  {RED}✗{RESET} {msg}")
def info(msg):  print(f"  {YELLOW}→{RESET} {msg}")
def header(msg): print(f"\n{BOLD}{CYAN}{msg}{RESET}")

# ─────────────────────────────────────────────
# GEMINI TESTER
# ─────────────────────────────────────────────

async def test_gemini(session: aiohttp.ClientSession, api_key: str, model: str) -> dict:
    if not api_key:
        return {"provider": "gemini", "model": model, "key_hint": "none", "status": "skipped", "reason": "No API key"}

    key_hint = f"...{api_key[-6:]}"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    payload = {
        "contents": [{"parts": [{"text": HEAVY_PROMPT}]}],
        "generationConfig": {"maxOutputTokens": 1024, "temperature": 0.7}
    }

    start = time.time()
    try:
        async with session.post(url, json=payload, timeout=aiohttp.ClientTimeout(total=TIMEOUT_SECONDS)) as resp:
            elapsed = round(time.time() - start, 2)
            body = await resp.json()

            if resp.status == 200:
                text = body.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                tokens = body.get("usageMetadata", {})
                return {
                    "provider": "gemini", "model": model, "key_hint": key_hint,
                    "status": "ok", "elapsed": elapsed,
                    "output_chars": len(text),
                    "tokens_in": tokens.get("promptTokenCount", "?"),
                    "tokens_out": tokens.get("candidatesTokenCount", "?"),
                }
            else:
                error = body.get("error", {}).get("message", str(body))
                return {"provider": "gemini", "model": model, "key_hint": key_hint, "status": "error", "elapsed": elapsed, "reason": error[:120]}

    except asyncio.TimeoutError:
        return {"provider": "gemini", "model": model, "key_hint": key_hint, "status": "timeout", "reason": f">{TIMEOUT_SECONDS}s"}
    except Exception as e:
        return {"provider": "gemini", "model": model, "key_hint": key_hint, "status": "error", "reason": str(e)[:120]}

# ─────────────────────────────────────────────
# OPENROUTER TESTER
# ─────────────────────────────────────────────

async def test_openrouter(session: aiohttp.ClientSession, api_key: str, model: str) -> dict:
    if not api_key:
        return {"provider": "openrouter", "model": model, "key_hint": "none", "status": "skipped", "reason": "No API key"}

    key_hint = f"...{api_key[-6:]}"
    url = "https://openrouter.ai/api/v1/chat/completions"

    payload = {
        "model": model,
        "messages": [{"role": "user", "content": HEAVY_PROMPT}],
        "max_tokens": 1024,
        "temperature": 0.7,
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://traveloop.app",
        "X-Title": "Traveloop Model Tester",
    }

    start = time.time()
    try:
        async with session.post(url, json=payload, headers=headers, timeout=aiohttp.ClientTimeout(total=TIMEOUT_SECONDS)) as resp:
            elapsed = round(time.time() - start, 2)
            body = await resp.json()

            if resp.status == 200:
                text = body.get("choices", [{}])[0].get("message", {}).get("content", "")
                usage = body.get("usage", {})
                return {
                    "provider": "openrouter", "model": model, "key_hint": key_hint,
                    "status": "ok", "elapsed": elapsed,
                    "output_chars": len(text),
                    "tokens_in": usage.get("prompt_tokens", "?"),
                    "tokens_out": usage.get("completion_tokens", "?"),
                }
            else:
                error = body.get("error", {}).get("message", str(body))
                return {"provider": "openrouter", "model": model, "key_hint": key_hint, "status": "error", "elapsed": elapsed, "reason": error[:120]}

    except asyncio.TimeoutError:
        return {"provider": "openrouter", "model": model, "key_hint": key_hint, "status": "timeout", "reason": f">{TIMEOUT_SECONDS}s"}
    except Exception as e:
        return {"provider": "openrouter", "model": model, "key_hint": key_hint, "status": "error", "reason": str(e)[:120]}

# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

async def main():
    print(f"\n{BOLD}{'='*60}{RESET}")
    print(f"{BOLD}  Traveloop Model Tester — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{RESET}")
    print(f"{BOLD}{'='*60}{RESET}")
    print(f"  Prompt size : {len(HEAVY_PROMPT)} chars")
    print(f"  Timeout     : {TIMEOUT_SECONDS}s per request")

    active_gemini_keys  = [k for k in GEMINI_API_KEYS if k]
    active_openrouter_keys = [k for k in OPENROUTER_API_KEYS if k]

    print(f"  Gemini keys : {len(active_gemini_keys)}")
    print(f"  OR keys     : {len(active_openrouter_keys)}")

    tasks = []

    connector = aiohttp.TCPConnector(limit=20)
    async with aiohttp.ClientSession(connector=connector) as session:

        # Build all gemini tasks (each key × each model)
        header("\n── GEMINI TESTS ──────────────────────────────")
        if not active_gemini_keys:
            print(f"  {YELLOW}No Gemini API keys set. Set GEMINI_API_KEY_1 etc.{RESET}")
        for key in (active_gemini_keys or [""]):
            for model in GEMINI_MODELS:
                tasks.append(test_gemini(session, key, model))

        # Build all openrouter tasks
        header("── OPENROUTER TESTS ───────────────────────────")
        if not active_openrouter_keys:
            print(f"  {YELLOW}No OpenRouter API keys set. Set OPENROUTER_API_KEY_1 etc.{RESET}")
        for key in (active_openrouter_keys or [""]):
            for model in OPENROUTER_MODELS:
                tasks.append(test_openrouter(session, key, model))

        print(f"\n  Running {len(tasks)} tests concurrently...\n")

        results = await asyncio.gather(*tasks)

    # ── PRINT RESULTS ──
    header("── RESULTS ────────────────────────────────────")

    working   = []
    failed    = []
    skipped   = []

    for r in results:
        provider = r["provider"].upper()
        model    = r["model"]
        key      = r.get("key_hint", "?")
        status   = r["status"]

        label = f"[{provider}] {model} (key {key})"

        if status == "ok":
            elapsed = r.get("elapsed", "?")
            chars   = r.get("output_chars", 0)
            tok_in  = r.get("tokens_in", "?")
            tok_out = r.get("tokens_out", "?")
            ok(f"{label}  →  {elapsed}s  |  {chars} chars  |  in:{tok_in} out:{tok_out}")
            working.append(r)
        elif status == "skipped":
            skipped.append(r)
        else:
            reason = r.get("reason", "unknown")
            fail(f"{label}  →  [{status}] {reason}")
            failed.append(r)

    # ── SUMMARY ──
    header("── SUMMARY ────────────────────────────────────")
    print(f"  {GREEN}Working : {len(working)}{RESET}")
    print(f"  {RED}Failed  : {len(failed)}{RESET}")
    print(f"  {YELLOW}Skipped : {len(skipped)}{RESET}")

    if working:
        header("── WORKING MODELS (copy to .env) ──────────────")
        seen_models = {}
        for r in sorted(working, key=lambda x: x.get("elapsed", 99)):
            model    = r["model"]
            provider = r["provider"]
            key      = r.get("key_hint", "?")
            elapsed  = r.get("elapsed", "?")

            # deduplicate same model across keys
            if model not in seen_models:
                seen_models[model] = r
                tag = ""
            else:
                tag = " (duplicate key)"

            print(f"  {GREEN}✓{RESET} [{provider}] {model}  {elapsed}s  key:{key}{tag}")

        # Recommend top 3
        top = sorted(seen_models.values(), key=lambda x: x.get("elapsed", 99))[:3]
        header("── TOP 3 FASTEST — recommended for .env ───────")
        for i, r in enumerate(top):
            label = "DEFAULT_MODEL" if i == 0 else f"FALLBACK_MODEL" if i == 1 else "HEAVY_MODEL"
            print(f"  {BOLD}{label}={r['model']}{RESET}  ({r.get('elapsed')}s)")

        # Write to file
        output = {
            "tested_at": datetime.now().isoformat(),
            "working": [
                {
                    "provider": r["provider"],
                    "model": r["model"],
                    "elapsed": r.get("elapsed"),
                    "output_chars": r.get("output_chars"),
                }
                for r in sorted(working, key=lambda x: x.get("elapsed", 99))
            ],
            "failed": [
                {"provider": r["provider"], "model": r["model"], "reason": r.get("reason")}
                for r in failed
            ],
        }
        with open("model_test_results.json", "w") as f:
            json.dump(output, f, indent=2)
        print(f"\n  {CYAN}Full results saved → model_test_results.json{RESET}")
    else:
        print(f"\n  {RED}No working models found. Check your API keys.{RESET}")

    print(f"\n{'='*60}\n")


if __name__ == "__main__":
    asyncio.run(main())
