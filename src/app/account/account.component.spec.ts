// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AccountComponent } from './account.component';

// describe('AccountComponent', () => {
//   let component: AccountComponent;
//   let fixture: ComponentFixture<AccountComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AccountComponent]
//     });
//     fixture = TestBed.createComponent(AccountComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [AccountComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    component.loggedInUser = { username: 'testUser', role: 1 };

  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding HTTP requests
  });

  it('should fetch all groups', () => {
    const mockGroups = [{
      id: 1,
      groupName: "Test Group",
      valid: true,
      members: ["testUser"]
    }];

    component.getGroups();

    const req = httpMock.expectOne("http://localhost:3000/all-groups");
    expect(req.request.method).toBe('GET');
    req.flush(mockGroups);

    expect(component.allGroups).toEqual(mockGroups);
    expect(component.currentUserGroups).toEqual(mockGroups);
  });

  it('should fetch all users', () => {
    const mockUsers = [{
      id: 1,
      username: "testUser"
    }];

    component.getUsers();

    const req = httpMock.expectOne("http://localhost:3000/all-users");
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    expect(component.users).toEqual(mockUsers);
  });

});
