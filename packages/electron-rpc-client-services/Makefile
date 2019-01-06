NODE_BINS = ../../node_modules/.bin

.PHONY: all clean comb lint build build-main build-render

all: clean comb lint build

clean:
	rm -rf ./dist ./lib

comb:
	$(NODE_BINS)/prettier --write "./**/*.{js,ts,tsx,json,graphql,md,*rc}"

lint:
	$(NODE_BINS)/tslint -t codeFrame --project ./tsconfig.json ./src/**/*.{ts,tsx}

build: build-main build-render

build-main:
	$(NODE_BINS)/tsc --project ./tsconfig.json

build-render:
	$(NODE_BINS)/webpack --config ./webpack.config.js
