NODE_MODULES=./node_modules

.PHONY: clean run debug

$(NODE_MODULES):
	npm install

clean:
	rm -rf $(NODE_MODULES)

run: $(NODE_MODULES)
	node server.js

debug: $(NODE_MODULES)
	node debug server.js
