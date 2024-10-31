// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.workspace.onDidChangeTextDocument((event) => {
		const editor = vscode.window.activeTextEditor;
		if (editor && event.contentChanges.length > 0 && editor.document.languageId === 'python') {
			const contentChange = event.contentChanges[0];
			const position = contentChange.range.end;
			const document = editor.document;
			const line = document.lineAt(position.line);
			const previousLine = document.lineAt(position.line - 1);

			if (
				line.text.includes('def ') &&
				!line.text.includes('self') &&
				!line.text.includes('cls') &&
				!previousLine.text.includes('@staticmethod')
			) {
				const isInsideClass = document.getText().includes(`class ${line.text.split(' ')[0]}`);

				if ((contentChange.text === '(' || contentChange.text === '()') && isInsideClass) {
					if (previousLine.text.includes('@classmethod')) {
						editor.edit((editBuilder) => {
							editBuilder.insert(
								new vscode.Position(position.line, position.character + 1),
								'cls, '
							);
						});
					}
					editor.edit((editBuilder) => {
						editBuilder.insert(
							new vscode.Position(position.line, position.character + 1),
							'self, '
						);
					});
				}
			}
		}
	});
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
