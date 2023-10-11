// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginComponent]
//     });
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';

import { FormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  class MockRouter {
    navigateByUrl(url: string) { return url; }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should set session storage and navigate to account when login is successful', () => {
    const mockResponse = {
      ok: true,
      user: { id: 1, username: 'testUser' }
    };
  
    spyOn(sessionStorage, 'setItem');
    spyOn(router, 'navigateByUrl');
  
    component.userpwd = { username: "test", password: "test123" };
    component.loginfunc();
  
    const req = httpMock.expectOne('http://localhost:3000/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  
    expect(sessionStorage.setItem).toHaveBeenCalledWith('current.user', JSON.stringify(mockResponse.user));
    expect(router.navigateByUrl).toHaveBeenCalledWith('account');
  });

  it('should navigate to create-user when creatfunc is called', () => {
    spyOn(router, 'navigateByUrl');
    component.creatfunc();
    expect(router.navigateByUrl).toHaveBeenCalledWith('create-user');
  });
  

});
