import { TestBed } from '@angular/core/testing';

describe('Description', () => {
  // let injectedService.

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        // Components.
      ],
      imports: [
        // Modules.
      ],
      providers: [
        // Provider
        // {
        //    provide: Provider
        //    userValue: providerStub
        // }
      ]
    });
    // injectedService = Testbed.get(InjectedService);
  });

  it('should do what is specified here', () => {
    // SpyOn(injectedService, 'function').and.callThrough() | callFake() | returnValue() | stub() | throwError()
    // whatever.injectedService.function();
    // expect(injectedService.function).toHaveBeenCalled();
  });
});
