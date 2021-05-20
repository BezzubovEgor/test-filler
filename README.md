## To fill your test form:

1. Open and start your test
2. Open devtools of your browser (press f12)
3. Go to the 'console' tab of devtools
4. Click on console
5. Paste next line(s) to the console
```
fetch('https://raw.githubusercontent.com/BezzubovEgor/test-filler/main/fill.js')
  .then(data => data.text())
  .then(eval);
```
6. Press `Enter` and your test form should be automatically filled
