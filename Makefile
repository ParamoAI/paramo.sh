.PHONY: help dev build clean install

help:
	@echo "Páramo.sh NextJS Site"
	@echo ""
	@echo "Commands:"
	@echo "  make dev      - Start development server"
	@echo "  make build    - Build for production"
	@echo "  make clean    - Remove build artifacts"
	@echo "  make install  - Install dependencies"
	@echo ""

dev:
	npm run dev

build:
	npm run build

clean:
	rm -rf docs/ .next/ node_modules/.cache/

install:
	npm install
