VERSION := "v$$(cat buildpack.toml | grep -m 1 version | sed -e 's/version = //g' | xargs)"

package: clean
	@tar cvzf node-function-cloudevents-buildpack-$(VERSION).tgz bin/ cloudevents.js package.json package-lock.json buildpack.toml

clean:
	@rm -f node-function-cloudevents-buildpack-$(VERSION).tgz
