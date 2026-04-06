import re

# Update portfolio.html
with open('portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

# portfolio items wrap the img in .portfolio-img. Let's add .img-mask-reveal to the wrap instead of relying on scale/fade.
content = content.replace('class="portfolio-img"', 'class="portfolio-img img-mask-reveal"')

with open('portfolio.html', 'w', encoding='utf-8') as f:
    f.write(content)


# Update services.html
with open('services.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any .scale-up on services images with .img-mask-reveal
content = content.replace('class="img-rounded scale-up"', 'class="img-rounded img-mask-reveal"')
content = content.replace('class="img-rounded fade-up"', 'class="img-rounded img-mask-reveal"')
content = content.replace('class="img-rounded fade-left"', 'class="img-rounded img-mask-reveal"')
content = content.replace('class="img-rounded fade-right"', 'class="img-rounded img-mask-reveal"')

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update about.html
with open('about.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('class="img-rounded scale-up"', 'class="img-rounded img-mask-reveal"')
content = content.replace('class="img-rounded fade-up"', 'class="img-rounded img-mask-reveal"')
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(content)
