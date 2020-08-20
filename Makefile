all:
	npm run build && sed -i -e 's/\/static/static/g' ./build/index.html

