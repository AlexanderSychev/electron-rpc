PACKAGE_DIR_PREFIX = ./packages/electron-rpc-
TO_ROOT = cd ../..

.PHONY: all async-queue utils client server server-controllers client-services common test-case

all: utils async-queue server client server-controllers client-services common test-case

utils:
	cd $(PACKAGE_DIR_PREFIX)utils && $(MAKE)

async-queue:
	cd $(PACKAGE_DIR_PREFIX)async-queue && $(MAKE)

client:
	cd $(PACKAGE_DIR_PREFIX)client && $(MAKE)

server:
	cd $(PACKAGE_DIR_PREFIX)server && $(MAKE)

server-controllers:
	cd $(PACKAGE_DIR_PREFIX)server-controllers && $(MAKE)

client-services:
	cd $(PACKAGE_DIR_PREFIX)client-services && $(MAKE)

common:
	cd $(PACKAGE_DIR_PREFIX)common && $(MAKE)

test-case:
	cd $(PACKAGE_DIR_PREFIX)test-case && $(MAKE)
