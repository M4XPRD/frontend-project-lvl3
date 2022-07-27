install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .	
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --coverage
test-watch:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --watch
test:
	NODE_OPTIONS=--experimental-vm-modules  npx jest
webpack:
	npm run webpack
start:
	npm run start