// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';
// import { ChannelsComponent } from './channels.component';
// import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
// import { of } from 'rxjs';
// import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule

// describe('ChannelsComponent', () => {
//   let component: ChannelsComponent;
//   let fixture: ComponentFixture<ChannelsComponent>;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ChannelsComponent],
//       imports: [HttpClientTestingModule, FormsModule, RouterTestingModule], // Add RouterTestingModule here
//       providers: [
//         // No need to provide ActivatedRoute
//       ]
//     });
//     fixture = TestBed.createComponent(ChannelsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ChannelsComponent } from './channels.component';
import { RouterTestingModule } from '@angular/router/testing';


const BACKEND_URL = "http://localhost:3000";

describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let fixture: ComponentFixture<ChannelsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelsComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(ChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add user to channel', () => {
    // Set up a mock currentGroup with channels
    component.currentGroup = {
      channels: {
        channel1: [],
        channel2: [],
      },
    };

    // Set up loggedInUser
    component.loggedInUser = { username: 'testUser' };

    // Define the targetChannel you want to add the user to
    const targetChannel = 'channel1';

    // Call the addUserToChannel method
    component.addUserToChannel(targetChannel);

    // Expect that the user is added to the target channel
    expect(component.currentGroup.channels[targetChannel]).toContain(component.loggedInUser.username);

    // ... Additional expectations for the method's behavior

    // Optionally, you can add expectations for the HTTP request if needed
    const req = httpMock.expectOne(`${BACKEND_URL}/update-groups`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(component.currentGroup);
  });
});
