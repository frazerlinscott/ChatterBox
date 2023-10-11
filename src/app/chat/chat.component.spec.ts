// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';
// import { ChatComponent } from './chat.component';
// import { UploadService } from '../service/upload.service';
// import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule

// describe('ChatComponent', () => {
//   let component: ChatComponent;
//   let fixture: ComponentFixture<ChatComponent>;
//   let uploadService: UploadService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ChatComponent],
//       imports: [HttpClientTestingModule, FormsModule, RouterTestingModule], // Add RouterTestingModule here
//       providers: [
//         // No need to provide ActivatedRoute
//       ]
//     });

//     fixture = TestBed.createComponent(ChatComponent);
//     component = fixture.componentInstance;
//     uploadService = TestBed.inject(UploadService);
//     httpMock = TestBed.inject(HttpTestingController);

//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
    
//     // Expect an HTTP request
//     const req = httpMock.expectOne('http://localhost:3000/messages?groupName=undefined&channelName=undefined');
  
//     // Check if the request method is GET (or POST/PUT/DELETE as per your component's logic)
//     expect(req.request.method).toBe('GET'); // Change 'GET' to the expected method
  
//     // Provide a mock response
//     const mockResponse = {
//       // Your mock response data
//     };
//     req.flush(mockResponse); // Flush the request with the mock response
//   });
  
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Message } from 'server/models/messageModel';


const BACKEND_URL = "http://localhost:3000";
const groupName = "Group1";
const channelName = "Super";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
    // Expect an HTTP request
    const req = httpMock.expectOne('http://localhost:3000/messages?groupName=undefined&channelName=undefined');
  
    // Check if the request method is GET (or POST/PUT/DELETE as per your component's logic)
    expect(req.request.method).toBe('GET'); // Change 'GET' to the expected method
  
    // Provide a mock response
    const mockResponse = {
      // Your mock response data
    };
    req.flush(mockResponse); // Flush the request with the mock response
  });

  // it('should fetch previous messages', () => {
  //   // Set up test data

  //   // Call the fetchPreviousMessages method
  //   component.fetchPreviousMessages(groupName, channelName);

  //   // Expect an HTTP request with the correct URL
  //   const expectedUrl = `${BACKEND_URL}/messages?groupName=${groupName}&channelName=${channelName}`;
  //   const req = httpMock.expectOne(expectedUrl);
  //   expect(req.request.method).toBe('GET');

  //   // Provide a mock response
  //   const mockResponse: Message[] = [
  //     // Your mock message data
  //   ];
  //   req.flush(mockResponse);

  //   // Expect that the messages property is updated with the mock response
  //   expect(component.messages).toEqual(mockResponse);

  //   httpMock.verify();
  // });
});
