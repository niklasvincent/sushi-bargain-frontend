install: SHELL:=/bin/bash
install: package.json
	( \
       npm install; \
  )

js:
	( \
       npm run js; \
    )

test: SHELL:=/bin/bash
test:
	( \
	    cd web; \
	    npm run test; \
	)
