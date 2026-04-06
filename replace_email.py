import os

html_files = ["index.html", "about.html", "services.html", "portfolio.html", "contact.html"]

old_email = "developers.empireae@gmail.com"
new_email = "info@empireae.xyz"

for file_name in html_files:
    if os.path.exists(file_name):
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_email in content:
            new_content = content.replace(old_email, new_email)
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Replaced in {file_name}")
