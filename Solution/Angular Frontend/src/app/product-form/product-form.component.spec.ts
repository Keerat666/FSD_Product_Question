import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let compiled;
  let nameInput;
  let idInput;
  let cpInput;
  let spInput;
  let discountInput;
  let resultOutput
  let submitButton;

  const pushInputValue = async (el, value) => {
    el.value = value;
    el.dispatchEvent(new Event('change'));
    el.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ ProductFormComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;

    await fixture.detectChanges();
    await fixture.whenStable();

    nameInput = getByTestId('name-input');
    idInput = getByTestId('id-input');
    cpInput = getByTestId('cp-input');
    spInput = getByTestId('sp-input');
    discountInput=getByTestId('discount-input');
    submitButton = getByTestId('submit-button');
    resultOutput = getByTestId('result-output');
  });

  it('initial UI is rendered properly', async() => {
    expect(nameInput.value).toBeFalsy();
    expect(idInput.value).toBeFalsy();
    expect(cpInput.value).toBeFalsy();
    expect(spInput.value).toBeFalsy();
    expect(discountInput.value).toBeFalsy();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Validation that product name contains alphabetic letters only works', async() => {
    await pushInputValue(nameInput, 'test1');
    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(nameInput).toHaveClass("error")
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Validation that product id validation works', async() => {
    await pushInputValue(idInput, 'A13');
    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(idInput).toHaveClass("error")
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Validation that product cost price validation works', async() => {
    await pushInputValue(cpInput, -5);
    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(cpInput).toHaveClass("error")
    expect(submitButton.disabled).toBeTruthy();
  });


  it('Validation that product selling price validation works', async() => {
    await pushInputValue(spInput, -800);
    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(spInput).toHaveClass("error")
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Validation that product discount validation works', async() => {
    await pushInputValue(discountInput, 2);
    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(discountInput).toHaveClass("error")
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Validation #1 that form works as expected', async() => {
    await pushInputValue(nameInput, 'FerrariToy');
    await pushInputValue(idInput, 'b24');
    await pushInputValue(cpInput, 130);
    await pushInputValue(spInput, 125);
    await pushInputValue(discountInput, 1);

    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(submitButton.disabled).toBeFalsy();
    submitButton.click()
    expect(resultOutput.textContent.trim()).toBe("Product Saved");
  });


  it('Validation #2 that form works as expected', async() => {
    await pushInputValue(nameInput, 'FerrariToy');
    await pushInputValue(idInput, 'b24');
    await pushInputValue(cpInput, 125);
    await pushInputValue(spInput, 130);
    await pushInputValue(discountInput, 1);

    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(submitButton.disabled).toBeFalsy();
    submitButton.click()
    expect(resultOutput.textContent.trim()).toBe("Product not saved as isDiscounted is wrong.");
  });

  it('Validation #3 that form works as expected', async() => {
    await pushInputValue(nameInput, 'PorscheToy');
    await pushInputValue(idInput, 'a24');
    await pushInputValue(cpInput, 125);
    await pushInputValue(discountInput, 1);

    await fixture.detectChanges();
    await fixture.whenStable();
    submitButton = getByTestId('submit-button');
    expect(submitButton.disabled).toBeTrue();
  });

});
