ECHO run build
start /wait gatsby build
ECHO end build and run public
surge public/
ECHO end public