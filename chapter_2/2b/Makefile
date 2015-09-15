NODE_MODULES=./node_modules

.PHONY: clean test debug

$(NODE_MODULES):
	npm install

clean:
	rm -rf $(NODE_MODULES)

test: $(NODE_MODULES)
	npm test

debug: $(NODE_MODULES)
	npm run debug
