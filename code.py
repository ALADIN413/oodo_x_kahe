python3 - <<'PY'
from pathlib import Path

IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    ".expo",
    "android",
    "ios"
}

OUTPUT = "code.md"

with open(OUTPUT, "w", encoding="utf-8") as out:
    for path in sorted(Path(".").rglob("*")):
        if any(part in IGNORE_DIRS for part in path.parts):
            continue

        if path.is_file():
            out.write(f"\n# FILE: {path}\n\n")

            try:
                content = path.read_text(encoding="utf-8")
            except:
                continue

            out.write("```")
            out.write(path.suffix.replace(".", "") or "text")
            out.write("\n")
            out.write(content)
            out.write("\n```\n")

print(f"Generated {OUTPUT}")
PY
