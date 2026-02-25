## help - Display help about make targets for this Makefile
help:
	@cat Makefile | grep '^## ' --color=never | cut -c4- | sed -e "`printf 's/ - /\t- /;'`" | column -s "`printf '\t'`" -t

BUILD_DIR := docs

## install - install dependency packages
install:
	npm install

## dev - starts the Next.js development server on port 3000
dev: install
	npm run dev

## run - run the Next.js app server
run: install
	npm run build && npm start

## clean - clean previous builds
clean:
	rm -rf $(BUILD_DIR)/ .next/

## build - build the app for release
build: clean install
	npm run build
	cp CNAME $(BUILD_DIR)/ || true
	touch $(BUILD_DIR)/.nojekyll

## deploy - build and deploy the app
deploy: build
	git add $(BUILD_DIR)
	git commit -m "Deploy `git rev-parse --short HEAD`" --no-verify
	git push origin HEAD

## lint - run linter
lint:
	npm run lint

## format - format code with prettier
format:
	npm run format

## format-check - check code formatting
format-check:
	npm run format:check
