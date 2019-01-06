NODE_BINS = ../../node_modules/.bin

.PHONY: all clean comb lint build build-main build-render page copy-bundle

all: clean comb lint build page copy-bundle

clean:
	rm -rf ./dist

comb:
	$(NODE_BINS)/prettier --write "./**/*.{js,ts,tsx,json,graphql,md,*rc}"

lint:
	$(NODE_BINS)/tslint -t codeFrame --project ./src/electron/tsconfig.json ./src/electron/**/*.{ts,tsx}
	$(NODE_BINS)/tslint -t codeFrame --project ./src/frontend/tsconfig.json ./src/frontend/**/*.{ts,tsx}

build: build-main build-render

build-main:
	$(NODE_BINS)/tsc --project ./src/electron/tsconfig.json

build-render:
	$(NODE_BINS)/webpack --config ./webpack.config.js

page:
	node ../../pug.js ./src/frontend/index.pug ./dist/frontend/index.html

copy-bundle:
	cp ../electron-rpc-common/lib/electron-rpc-common.min.js ./dist/frontend/electron-rpc-common.min.js
