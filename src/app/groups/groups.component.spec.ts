import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GroupsComponent } from './groups.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsComponent],
      imports: [FormsModule, HttpClientTestingModule],
    });

    window.sessionStorage.setItem('current.user', JSON.stringify({ 
      username: 'testUser', 
      role: 1, // or any other role you need to mock
      profilePic: 'path_to_pic.png'
    }));
  

    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.loggedInUser = { username: 'testUser' }; // Set up a loggedInUser
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should leave group', () => {
    // Create a mock group
    const mockGroup: {
      id: number;
      groupName: string;
      members: string[];
      channels: Record<string, string[]>; // Type annotation for channels object
    } = {
      id: 1,
      groupName: 'Test Group',
      members: ['testUser'],
      channels: {
        channel1: ['testUser'], // Example channel with user 'testUser'
        channel2: [], // Example channel with no members
      },
    };

    // Call the leaveGroup method
    component.leaveGroup(mockGroup);

    // Expect that the user is removed from the group members
    expect(mockGroup.members).toEqual([]);

    // Expect that the user is removed from all channels in the group
    for (const channelName in mockGroup.channels) {
      expect(mockGroup.channels[channelName]).toEqual([]);
    }

    // ... Additional expectations for the method's behavior
  });
});



// import { TestBed, ComponentFixture, async } from '@angular/core/testing';
// import { GroupsComponent } from './groups.component';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FormsModule } from '@angular/forms';
// import * as $ from 'jquery';

// const BACKEND_URL = "http://localhost:3000";

// describe('GroupsComponent', () => {
//     let component: GroupsComponent;
//     let fixture: ComponentFixture<GroupsComponent>;
//     let httpMock: HttpTestingController;

//     beforeEach(async(() => {
//         // Mock the current user in session storage
//         const mockUser = {
//             username: 'user1',
//             role: 3 
//         };

//         sessionStorage.setItem('current.user', JSON.stringify(mockUser));

//         TestBed.configureTestingModule({
//             imports: [
//                 HttpClientTestingModule,
//                 RouterTestingModule,
//                 FormsModule 
//             ],
//             declarations: [GroupsComponent]
//         }).compileComponents();

//         fixture = TestBed.createComponent(GroupsComponent);
//         component = fixture.componentInstance;
//         httpMock = TestBed.inject(HttpTestingController);
//         fixture.detectChanges();
//     }));

//     afterEach(() => {
//         httpMock.verify(); // Ensure that no requests are outstanding
//     });

//     it('should make an HTTP POST request when the requestButton is clicked', () => {
//         const mockGroup = {
//             groupID: 1, // Replace with an appropriate group ID
//             userRequests: [] as string[] 
//             // Other properties of the mock group as needed
//         };
  
//         component.loggedInUser = { username: 'user1' };
  
//         component.requestButton(mockGroup);
  
//         const req = httpMock.expectOne(`${BACKEND_URL}/update-groups`); // Assuming BACKEND_URL is imported
//         expect(req.request.method).toBe('POST');
//         expect(req.request.body).toEqual(mockGroup); // Ensure that the request body matches the group object
  
//         req.flush({}); // Mock a successful response
  
//         // Check that the user request was updated
//         expect(mockGroup.userRequests).toContain('user1');
  
//         // Verify that the button is disabled after the request
//         expect(component.buttonDisabledStates[mockGroup.groupID]).toBe(true);
//     });
// });
