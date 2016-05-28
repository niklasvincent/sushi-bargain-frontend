install: SHELL:=/bin/bash
install: package.json
	( \
       npm install; \
  )

js:
	( \
       npm run js; \
  )

sass:
	( \
       npm run sass; \
  )

test: SHELL:=/bin/bash
test:
	( \
	    npm run test; \
	)

all:
	( \
       npm run compile; \
  )
