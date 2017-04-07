describe('textField', () => {
    let state = null;
    let $compile = null;
    let $componentController = null;
    let scope = null;

    beforeEach(() => {
        module('testAppModule');
        module('fieldsModule');
        inject(($injector, $rootScope) => {
            state = $injector.get('state');
            $compile = $injector.get('$compile');
            $componentController = $injector.get('$componentController');
            scope = $rootScope.$new();
        });
    });

    const getComponent = (html) => {
        const component = $compile(angular.element(html))(scope);
        scope.$digest();
        return component;
    };

    const getComponentCtrl = (attrs) => {
        return $componentController('textField', {
            $scope: {},
            $element: '<text-field></text-field>',
            $attrs: attrs
        });
    };

    it('should throw error if required name attr not provided', () => {
        expect(() => {getComponent('<text-field></text-field>');}).toThrow();
    });

    it('should produce input as default', () => {
        const component = getComponent('<text-field name="foo"></text-field>');
        expect(component.find('input')[0]).toBeDefined();
    });

    it('should produce textarea for multiline option', () => {
        const component = getComponent('<text-field name="foo" multiline></text-field>');
        expect(component.find('textarea')[0]).toBeDefined();
    });

    it('should use label as placeholder', () => {
        const component = getComponent('<text-field name="foo" label="bar"></text-field>');
        expect(component.find('input').attr('placeholder')).toBe('bar');
    });

    it('should save value to state on input change', () => {
        const compCtrl = getComponentCtrl({name: 'foo'});
        compCtrl.value = 'Quasimodo';
        compCtrl.onChange();
        const currentState = state.get();
        expect(currentState.textFields.foo.value).toBe('Quasimodo');
    });

    it('should save value to state on input blur', () => {
        const compCtrl = getComponentCtrl({name: 'bar'});
        compCtrl.value = 'Aladdin';
        compCtrl.onBlur();
        const currentState = state.get();
        expect(currentState.textFields.bar.value).toBe('Aladdin');
    });

    it('should set isValid to false for empty required field', () => {
        const compCtrl = getComponentCtrl({name: 'foo', required: ''});
        compCtrl.value = '';
        compCtrl.onChange();
        const currentState = state.get();
        expect(currentState.textFields.foo.isValid).toBe(false);
    });

    it('should set isValid to true for good required field', () => {
        const compCtrl = getComponentCtrl({name: 'foo', required: ''});
        compCtrl.value = 'I am a proper thing!';
        compCtrl.onChange();
        const currentState = state.get();
        expect(currentState.textFields.foo.isValid).toBe(true);
    });

    it('should get "valid" modifier for valid field', () => {
        const compCtrl = getComponentCtrl({name: 'foo', required: ''});
        compCtrl.value = 'I work';
        compCtrl.onChange();
        expect(compCtrl.getValidModifier()).toBe('valid');
    });

    it('should get "error" modifier for invalid field', () => {
        const compCtrl = getComponentCtrl({name: 'foo', required: ''});
        compCtrl.value = '';
        compCtrl.onChange();
        expect(compCtrl.getValidModifier()).toBe('error');
    });

    it('should get empty string modifier for virgin field', () => {
        const compCtrl = getComponentCtrl({name: 'foo', required: ''});
        expect(compCtrl.getValidModifier()).toBe('');
    });
});