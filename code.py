import os

def dump_codebase(root_dir: str, output_file: str = "code.md"):
    extensions = {'.ts', '.tsx', '.js', '.jsx', '.json', '.py', '.yaml', '.yml', '.md', '.txt', '.env', '.example'}
    skip_dirs = {'node_modules', '.git', 'dist', 'build', '.expo', '__pycache__', '.next', 'coverage'}
    skip_files = {'pnpm-lock.yaml', 'package-lock.json', 'expo-env.d.ts'}

    with open(output_file, 'w', encoding='utf-8') as out:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            dirnames[:] = [d for d in dirnames if d not in skip_dirs]
            for filename in sorted(filenames):
                if filename in skip_files:
                    continue
                ext = os.path.splitext(filename)[1]
                if ext not in extensions:
                    continue
                filepath = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(filepath, root_dir)
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    lang = ext.lstrip('.')
                    out.write(f"# FILE: {rel_path}\n\n")
                    out.write(f"```{lang}\n{content}\n```\n\n")
                except Exception as e:
                    out.write(f"# FILE: {rel_path}\n\n[Error reading file: {e}]\n\n")

    print(f"Done → {output_file}")

if __name__ == "__main__":
    dump_codebase(root_dir=".", output_file="code.md")
