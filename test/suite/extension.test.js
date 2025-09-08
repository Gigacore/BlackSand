const assert = require('assert');
const vscode = require('vscode');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

    test('Theme is registered', (done) => {
        const extension = vscode.extensions.getExtension('gigacore.blacksand');
        assert.ok(extension);

        extension.activate().then(() => {
            const themes = vscode.workspace.getConfiguration('workbench').get('colorTheme');
            assert.ok(themes);
            vscode.workspace.getConfiguration('workbench').update('colorTheme', 'BlackSand', vscode.ConfigurationTarget.Global).then(() => {
                const currentTheme = vscode.workspace.getConfiguration('workbench').get('colorTheme');
                assert.strictEqual(currentTheme, 'BlackSand');
                done();
            }, (err) => {
                assert.fail(err);
                done();
            });
        });
    });
});
