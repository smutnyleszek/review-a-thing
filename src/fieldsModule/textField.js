// -----------------------------------------------------------------------------
// textField component with such attr-options as:
// - name (required attribute)
// - label
// - multiline
// - required
// -----------------------------------------------------------------------------

class TextFieldController {
    static initClass() {
        TextFieldController.getTemplate = ($attrs) => {
            let input = '';
            if (typeof $attrs.multiline === 'string') {
                input = `
                    <textarea
                        i-textField-input="multiline"
                        placeholder="[[::$ctrl.label]]"
                        ng-model="$ctrl.value"
                        ng-change="$ctrl.onChange()"
                        ng-blur="$ctrl.onBlur()"
                        rows="4"
                    ></textarea>
                `;
            } else {
                input = `
                    <input
                        i-textField-input
                        placeholder="[[::$ctrl.label]]"
                        type="text"
                        ng-model="$ctrl.value"
                        ng-change="$ctrl.onChange()"
                        ng-blur="$ctrl.onBlur()"
                    >
                `;
            }

            return `
                <label i-textField="[[$ctrl.getValidModifier()]] [[::$ctrl.isRequired?'required':'']]">
                    ${input}
                </label>
            `;
        };

        TextFieldController.$inject = [
            '$attrs',
            'appStore',
            'appActions'
        ];
    }

    constructor($attrs, appStore, appActions) {
        if (typeof $attrs.name === 'undefined') {
            throw new Error('textField requires name attribute to work!');
        }

        this._appActions = appActions;

        this.label = $attrs.label;
        this.name = $attrs.name;
        this.value = null;
        this.isRequired = typeof $attrs.required !== 'undefined';
        this._isValid = null;

        appStore.registerStateObserver(this._onStateChange.bind(this));
    }

    _onStateChange(state) {
        this._isValid = state.fields[this.name].isValid;
    }

    onChange() {
        this._appActions.setField(this.name, this.value);
    }

    onBlur() {
        this._appActions.setField(this.name, this.value);
    }

    getValidModifier() {
        if (this._isValid === true) {
            return 'valid';
        } else if (this._isValid === false) {
            return 'error';
        } else {
            return '';
        }
    }
}

TextFieldController.initClass();

angular.module('fieldsModule').component('textField', {
    controller: TextFieldController,
    template: TextFieldController.getTemplate
});
