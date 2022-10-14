install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .	
updates:
	ncu
webpack:
	npm run webpack
start:
	npm run start
watch:
	npm run watch