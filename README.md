# Project README





### Angular (Node)

Angular is a popular front-end framework that utilizes Node.js for development. Here's how to set up and work with Angular:

1. **Install Node.js and npm**: Before you can work with Angular, make sure you have Node.js and npm installed on your system. You can download them from the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/).

- **Node Express**
- **Jquery**
- **Bootstrap**

2. **Install Angular CLI**: The Angular Command Line Interface (CLI) is a powerful tool for creating, building, testing, and deploying Angular applications. Install it globally using npm with the following command:
   
   ```bash
   npm install -g @angular/cli


# Git Repository Organization and Development Process

## Repository Name
`Assignment1_SoftwareFrames_s2930588`

## Branch Organization

The repository consists of a main branch and several feature-specific branches. Here's a breakdown:

- **Main (Default Branch)**: This branch contains the stable version of the project. Any fully developed and tested features are merged into this branch.
- **Page Authentication and Styling**: This branch focuses on the authentication process and associated UI styling.
- **Create User**: Branch dedicated to features related to creating a new user.
- **UserPage**: Branch where development of a list of all the users so the super admin is able to change user permission. 
- **Groups**: Branch for developing group-related functionalities.
- **Channels**: This branch is used for implementing channel-related features.
- **DBIntergration**: This branch is used to intergrate MONOGO DB into the system. 

## Development Process

1. **Branch Creation**: Whenever a new feature or functionality is to be added, a new branch is created from the main branch.
2. **Development**: All the development activities, be it coding, initial testing, or UI enhancements, happen within these feature branches.
3. **Multiple Commits**: Multiple commits to the current branch are made until branch is fully functional. 
4. **Merging**: Once the feature is tested and deemed stable, the feature branch is merged into the main branch.
5. **Repeat Step 1 - 4**: I repeated these steps until the system is fully functional. 

# System Explanation

The system is architected to emphasize real-time communication and efficient data handling, bridging an Angular frontend with a backend powered by Node.js, Express, and MongoDB.

## Server Side

### 1. **Setup & Configuration**:

- **Express Application**: The main server operates using `Express`, and it's configured to run on port `3000`.
- **Real-time Communication**: `socket.io` is integrated to handle real-time chat functionalities.
- **Database**: A local MongoDB database named `liveChatSystem` is in use.
- **CORS**: Cross-origin requests are allowed from `http://localhost:4200`, which is presumably the development URL for the Angular client.
- **File Management**: `Multer` is used to handle file uploads, with separate configurations for regular uploads and chat attachments.
- **Routes**: Various functionalities like login, messaging, and group management are encapsulated within distinct route files which are imported into the main server file.

### 2. **Database Interactions**:

- The system processes incoming HTTP requests via several route files (e.g., `login_DB.js`, `message_DB.js`). These routes facilitate the interaction with the MongoDB database to perform CRUD operations.
- Real-time chat or notifications are potentially managed through a `sockets.js` module which also has the ability to interact with the database.

### 3. **Socket Interactions**:

- A dedicated `sockets.js` module (content not provided) possibly caters to real-time chat or other live interactions, leveraging the capabilities of `socket.io`.

## Client Side

### 1. **Socket Service**:

- Establishes and manages a socket connection with the server at `http://localhost:3000`.
- Facilitates joining a specific chat channel.
- Sends chat messages coupled with user metadata and possible attachments.
- Monitors for real-time incoming chat messages.
- The current user's credentials are fetched from the session storage to link messages with the respective sender.

### 2. **Upload Service**:

- Entrusted with file uploads—presumably profile photos and chat attachments.
- Executes this by initiating POST requests to the server, which in turn, processes the uploads using Multer and potentially archives the metadata in the database.

## Interaction Flow:

### 1. **File Upload**:

- When a user opts to upload a file via the Angular frontend, the `UploadService` triggers a POST request with the respective file to the server.
- Server-side routes (like `uploadPic_DB.js`) process this request, store the file in the specified directory, and likely log the metadata in the database.

### 2. **Real-time Chat**:

- As a user inputs a message in a chat interface on the Angular frontend, the `SocketService.send` method is invoked, broadcasting the message and associated details through the socket.
- On the server side, a listener (assumedly in `sockets.js`) captures this message, processes it (which might include archiving it in the database), and relays it to other connected clients.


## Data Structures 

### LoginComponent Class:

#### Properties:
- `userpwd`: An object with two properties: `username` and `pwd`. These properties represent the input values of a login form.

#### Methods:
- `loginfunc()`: This function is triggered to log in a user. It makes a POST HTTP request to the "/login" endpoint of the backend, passing in the user's credentials. After the request, the response is processed, and based on the response, the function either saves user data to the session storage and redirects to the 'account' page or shows an alert if the login attempt is unsuccessful.
- `creatfunc()`: This function is for navigating to the 'create-user' route, to allow a user to create an account.

## Create User Component Class:

### Properties:

- **user**: This is an instance of the User class. 
  - It is initialized with default values.
- **allUsernames**: This is an array of strings. It holds a list of usernames fetched from the server, which will be used to check if a new username is unique.
- **isUniqueUsername**: A boolean that indicates if the username inputted by the user is unique or not. It starts as true and is updated as the user types.
- **isUniquePassword**: A boolean that indicates if the password and its confirmation match. True means they match, false means they don't.
- **isUniqueEmail**: A boolean indicating whether the inputted email is unique or not.

### Methods:

- **onUsernameInput()**: This method checks if the username currently in the `user` object is unique by checking against the `allUsernames` array.
- **onCreate()**: This method gets called when trying to create a new user. It checks if the password matches its confirmation. If they match, it sends an HTTP POST request to the server to create the user. The server's response is checked to determine if the creation was successful or if there was an issue, like a duplicate.

## Accounts Component Class:

### Properties:

#### Primitive Data Types:
- **username**: A string representing the username of the logged-in user.
- **birthdate**: A string representing the birthdate of the logged-in user.
- **age**: A number indicating the age of the logged-in user.

#### Objects and Arrays:
- **allGroups**: This is an object which holds details of all groups fetched from the server.
- **loggedInUser**: Object that holds the details of the currently logged-in user. It has properties: username, birthdate, age, email, password, role, group, and a validity flag (valid).
- **users**: An array of objects holding details of all users, fetched from the server.
- **currentUser**: An object holding the details of the currently logged-in user, fetched from the server for extra details.
- **currentUserGroups**: An array representing groups associated with the current user.
- **selectedGroup**: An object representing the group that the user selects or clicks on.

#### Booleans:
- **IsUser, isAdmin, and isSuperAdmin**: These booleans indicate the role of the logged-in user. They're mutually exclusive based on the code logic.

### Methods:

- **getGroups()**: Fetches all valid groups from the server and filters out any invalid ones. Once fetched, it also filters out groups that the current user is part of.
- **getUsers()**: Fetches all users from the server. After fetching, it identifies and sets the `currentUser` based on the username.
- **filterGroups(group: any)**: Filters out groups based on group IDs associated with the current user.
- **filterUser(users: any[])**: Finds the current user from the list of all users and assigns it to `currentUser`.
- **logout()**: Clears the session storage (logging out the user) and redirects the user to the login page.
- **openUsers()**: Redirects the user to the users' page.
- **openGroups()**: Redirects the user to the groups' page.
- **onGroupCardClick(group:any)**: Sets the selected group when a group card is clicked and redirects the user to the channels page with the selected group's data as query parameters.

## Users Component Class:

### Properties:

#### Objects and Arrays:
- **users**: This variable is to store user details fetched from the server.
- **selectedUser**: An object to represent a user selected by a super admin for edit or delete operations.
- **loggedInUser**: An object that holds the details of the currently logged-in user. The structure consists of username, birthdate, age, email, password, password confirmation (pwdconfirm), user role (role), group affiliations (group), and a validity flag (valid).

#### Primitive Data Types:
- **selectedRole**: A number or undefined, indicating the role of the selectedUser.

#### Booleans:
- **isUser, isAdmin, and isSuperAdmin**: These booleans represent the role of the logged-in user. Only one of them should be true based on the user's role, as inferred from the initialization logic.

### Methods:

- **getRoleName(roleNumber: number)**: Converts the role number (1, 2, or 3) into its string representation ('User', 'Admin', or 'Super Admin'). If the role number isn't recognized, it returns 'Unknown Role'.
- **openEditModal(user: any)**: Prepares a user for editing by setting selectedUser and selectedRole and then opens a modal for editing the user's role.
- **updateUserRole()**: Updates the role of the selectedUser and then sends the updated user data to the server for persistence. After updating on the server, it fetches the fresh list of users.
- **deleteUser()**: Marks the selectedUser as invalid (delete) and updates this status on the server. After the operation, the fresh list of users is fetched.
- **closeModal()**: Closes the edit user role modal.
- **getUsers()**: Fetches the list of all valid users from the server and assigns them to the users property.

## Profile Component Class:

### Properties:

#### Objects and Arrays:
- **user**: This object holds details about the current user. 
- **allUsernames**: An array containing all usernames fetched from the backend, used to ensure a username is unique when updating.

#### Booleans:
- **isUniqueUsername**: Indicates whether the username entered by the user is unique (not already in use).
- **isUniqueEmail**: Indicate whether an email is unique or not.
- **isUniquePassword**: Indicates whether a password is unique or not.

### Methods:

- **onUsernameInput()**: 
  - This method checks if the username currently being typed in is unique by looking up allUsernames. 
  - It updates the isUniqueUsername flag accordingly.

- **onSubmit()**: 
  - When the user submits the updated profile:
    - It retrieves the user details from the session storage.
    - It updates these details with the current values from the user object.
    - It then updates the session storage with this new user data.
    - It creates a new object (newDetails) containing the original username and the updated user details.
    - This new object is then sent to the server for updating. If the update is successful, the user is navigated to the /account route.

- **closeProfile()**: Navigates the user back to the /account page without making any changes.

- **deleteProfile()**: 
  - Marks the user as invalid (delete). 
  - It then sends this updated user object to the server to reflect the change. 
  - If successful, it navigates the user to a login route.

## Groups Component Class:

### Properties:
- **loggedInUser**: This property holds the current logged-in user information.
- **users, groups, allGroups, groupsNeedApproval, groupsAdminNeedApproval, selectedGroup, myGroups, joinedGroups, otherGroups**: Array of objects.
- **newGroupName, newChannelName**: String values to store the names of new groups or channels.
- **groupChannels**: An array of strings that hold channel names.
- **newGroupID, allGroupNames**: 'any' typed variables that hold an ID for a new group and an array of all group names.
- **Boolean Flags**: There are several boolean flags like:
  - **isUser, isAdmin, isSuperAdmin, noRequests, isUniqueGroup, and isButtonDisabled**: Used for UI logic.
- **numberOfRequests, numberOfAdminRequests**: Numbers to store the count of pending requests.
- **buttonDisabledStates**: An object with group IDs as keys and boolean values.
- **group**: An instance of a Group class.

### Methods:

- **ngOnInit()**: 
  - Initializes the component.
  - Fetches the logged-in user's data.
  - Fetches the list of all group names.
  
- **onGroupCardClick()**: Navigates to a 'channels' route.
- **requestButton()**: Sends a join request.
- **onAddGroup()**: Opens a modal to add a group.
- **onGroupInput()**: Checks if the entered group name is unique.
- **saveGroup()**: Saves the new group.
- **closeModal()**: Closes a modal.
- **getUsers(), getGroups()**: Fetches data from a backend service.
- **GetNewGroupID()**: Creates the next available group ID.
- **showRequests()**: Shows a modal with join requests.
- **requestAdminButton()**: Sends a request to become an admin.
- **deleteGroup()**: Marks a group as invalid.
- **showAdminRequests()**: Shows a modal with admin requests.
- **approveRequest()**: Approves a user's join request.
## Channels Component Class:

### Properties:

- **passedGroupObject**: 
  - Holds the data passed to this component via route query parameters.
  - Represents a group object with a `groupID` property.

- **myChannels & toJoinChannels**: 
  - Arrays (`any[]`) for channel names.
  - `myChannels` lists channels the logged-in user is part of.
  - `toJoinChannels` lists channels the user can join.

- **currentGroup**: 
  - Represents the group matching the `groupID` from `passedGroupObject`.
  - Contains a `channels` property: an object with each key as a channel name and its value as an array of usernames.

- **loggedInUser**: 
  - Object with details about the currently logged-in user.
  - Fetched from session storage and parsed into a JSON object.

- **groups**: 
  - An array of group objects fetched from the backend.

### Methods:

- **addUserToChannel & removeUserFromChannel**: 
  - Manipulate user membership in channels.
  - Update `currentGroup.channels` object and send updated data to the backend.

- **getGroups**: 
  - Sends a POST request for all groups.
  - Identifies `currentGroup` that matches `groupID` of `passedGroupObject`.
  - Segregates channels into `myChannels` and `toJoinChannels`.


## Chat Component Class:

### Properties:

- **chatMessages**: An `ElementRef` that references the chat messages' container in the DOM, useful for manipulating scrolling behavior.
- **messagecontent**: A string to hold the current message content that the user is typing.
- **ioConnection**: Represents the connection with the `SocketService`, useful for subscribing to and unsubscribing from events.
- **channel**: Stores the current chat channel the user is in.
- **currentChannel**: A nullable string that possibly holds a backup or prior state of the channel.
- **loggedInUser**: Represents the user that is currently logged into the chat session.
- **messages**: An array of `Message` objects that store chat messages.
- **profilePicPath**: Holds the path of the profile picture, possibly for the logged-in user.
- **attachmentFile**: A nullable `File` object that represents any attachment the user might want to send.
- **group**: Not actively used in the provided code, but possibly meant to store the current chat group details.
- **currentGroupString**: Represents the current chat group in a string format.
- **URL**: The main backend URL prefix.
- **attachmentId**: A number used to uniquely identify attachments.
- **attachmentURL**: The backend URL prefix specific to attachments.

### Methods:

- **fetchPreviousMessages(groupName: string, channelName: string)**: Fetches prior chat messages for a specific channel in a group.
  
- **scrollToBottom()**: Scrolls the chat interface to the bottom to display the latest message.

- **onFileSelected(event: any)**: Captures the file selected by a user for uploading.

- **initIoConnection()**: Initializes the socket connection to listen for incoming chat messages.
    - Subscribes to incoming messages from the server.
    - Filters messages for the current chat channel.
    - Updates the `messages` array to reflect the new incoming message.

- **sendMessage()**: Handles the sending of chat messages.
    - Checks if there's an attachment.
    - If yes, uploads the attachment before sending the message.
    - If no, directly sends the message.

- **uploadAttachment()**: Handles the uploading of files or attachments.
    - Utilizes the `UploadService` to send the attachment.
    - On successful upload, sends the message with the attachment reference.

- **sendAttachmentMessage(attachmentId: number)**: Sends a message that has an attachment.
    - Invokes the `socketService.send()` with the attachmentId.

- **sendOnlyMessage()**: Sends a message that does not have any attachment.
    - Directly invokes the `socketService.send()` with a placeholder for no attachment.




## Server Side Routes

### socket.js (Socket.IO Connection and Events)

#### **General Overview**
This module establishes a real-time connection between the server and its clients using Socket.IO. It also defines several event listeners and emitters for handling chat-related functionalities, like joining channels and sending/receiving messages.

---

#### `on: connection`
- **Parameters (internally by Socket.IO):**
  - `socket`: Object (Represents the individual client/socket connection)
- **Purpose:** Establishes a connection with the client and logs the connected user's socket ID.

---

#### `on: join`
- **Parameters:**
  - `channel`: String (The name of the chat channel the user wants to join)
- **Purpose:** Allows a user to join a specific chat channel. The user's socket will then receive messages sent to this channel.

---

#### `on: message`
- **Parameters:**
  - `data`: Object
    - `groupName`: String (Name of the group where the message belongs)
    - `channel`: String (Name of the channel within the group where the message belongs)
    - `message`: String (Actual content of the message)
    - `username`: String (Name of the user sending the message)
    - `profilePic`: String (Path to the user's profile picture)
    - `attachment`: (Could be any data type, specific type isn't clear from the provided code. Represents any attached files or data to the message)
- **Return Values (upon successfully saving message to database and emitting it):**
  - Emits a `message` event to the specific channel with:
    - `message`: String
    - `channel`: String
    - `username`: String
    - `profilePic`: String
    - `attachment`: [Data Type]
- **Purpose:** Receives a message from a client, saves it to the database, and then broadcasts it to other clients within the same chat channel.

---

### `saveMessageToDb(db, messageData)`

- **Parameters:**
  - `db`: Object (Database connection object)
  - `messageData`: Object (The message details that need to be saved to the database, structure similar to the `data` object in `on: message`)
- **Purpose:** Saves the provided message to the 'chatData' collection in the database. If the group or channel doesn't exist, it will create them. If they do exist, it will append the new message to the appropriate channel within the group.

---

### `/attachPhoto`
- **HTTP Method:** POST
- **Parameters:**
  - **File (multipart/form-data):** A photo that needs to be attached.
- **Return Values:**
  - **Success:** `{ message: 'File uploaded successfully!', attachmentId: 'the_unique_attachment_id' }`
  - **Failure (File rename error):** `{ status: 500, message: 'Server error while renaming the file!' }`
  - **Failure (DB save error):** `{ status: 500, message: 'Server error while saving to the database!' }`
  - **Failure (No file uploaded):** `{ status: 400, message: 'No file uploaded!' }`
- **Purpose:** This endpoint is used to handle the attachment of photos. When a photo is uploaded, it's initially stored with its original filename. Subsequently, a unique ID is generated for the attachment, and the photo is renamed with this ID. Once renamed, the details of the attachment are stored in the database.

### `/addUser`

- **HTTP Method:** POST
- **Parameters:**
  - `username`: String
  - `email`: String
  - `password`: String
  - `birthdate`: Date
- **Return Values:**
  - **Success:** `{ success: true, message: 'User created successfully.' }`
  - **Failure (Missing required fields):** `{ success: false, message: 'All fields are required.' }`
  - **Failure (Username or Email exists):** `{ success: false, message: 'Username or Email already exists.' }`
  - **Failure (Server Error):** `{ success: false, message: 'Internal Server Error.' }`
- **Purpose:** The endpoint is used to add a new user to the system. It first validates if all the required fields are present. If not, it responds with a failure. The system then calculates the age of the user based on the provided birthdate and attaches it to the user data. Before storing the user data, the system checks to ensure that the username doesn't already exist in the database. If all checks pass, the user data is stored in the database.
### `/groups`

- **HTTP Method:** GET
- **Parameters:** None
- **Return Values:**
  - **Success:** An array of group names. E.g., `["group1", "group2", ...]`
  - **Failure (Server Error):** `{ success: false, message: 'Internal Server Error.' }`
- **Purpose:** The endpoint retrieves all valid group names from the database. It queries the `groupData` collection for groups where the `valid` attribute is true and projects only the `groupName` field. If the retrieval is successful, it returns an array of group names. If there's a database error, it returns an error message.

### `/usernames`

- **HTTP Method:** GET
- **Parameters:** None
- **Return Values:**
  - **Success:** An array of usernames. E.g., `["username1", "username2", ...]`
  - **Failure (Server Error):** `{ success: false, message: 'Internal Server Error.' }`
- **Purpose:** The endpoint retrieves all valid usernames from the database. It queries the `UserData` collection for users where the `valid` attribute is true and projects only the `username` field. If the retrieval is successful, it returns an array of usernames. If there's a database error, it returns an error message.

### `/all-groups`

- **HTTP Method:** GET
- **Parameters:** None
- **Return Values:**
  - **Success:** An array of groups. Each group can have multiple fields as they are fetched directly from the database. E.g., `[{ groupId: 1, groupName: "group1", ... }, ...]`
  - **Failure (Server Error):** `{ ok: false, message: 'Internal Server Error' }`
- **Purpose:** The endpoint retrieves all groups from the `groupData` collection in the database without any filter or projection. If the retrieval is successful, it returns an array of group objects directly as stored in the database. In case of any database-related issues, it returns an error message.

### `/all-users`

- **HTTP Method:** GET
- **Parameters:** None
- **Return Values:**
  - **Success:** An array of users. Each user can have multiple fields as they are fetched directly from the database. E.g., `[{ userId: 1, username: "JohnDoe", ... }, ...]`
  - **Failure (Server Error):** `{ ok: false, message: 'Internal Server Error' }`
- **Purpose:** The endpoint retrieves all users from the `UserData` collection in the database without any filter or projection. If the retrieval is successful, it returns an array of user objects directly as stored in the database. In case of any database-related issues, it returns an error message.

### `/login`

- **HTTP Method:** POST
- **Parameters:**
  - `username`: String
  - `password`: String
- **Return Values:**
  - **Success:** `{ ok: true, user: foundUser }`
  - **Failure (User not found):** `{ ok: false }`
  - **Failure (Server Error):** `{ ok: false, message: 'Internal Server Error' }`
- **Purpose:** The endpoint authenticates a user based on the provided username and password from the request body. If the user is found in the `UserData` collection in the database and the `valid` flag is true, the user data is returned in the response. If no matching user is found, a failure response is returned. In case of any database-related issues or errors, an error message is returned.

### `/messages`

- **HTTP Method:** GET
- **Parameters (query parameters):**
  - `groupName`: String
  - `channelName`: String
- **Return Values:**
  - **Success:** Array of messages (with attachment file paths if present)
  - **Failure (Invalid parameters):** `{ error: 'Both groupName and channelName are required.' }`
  - **Failure (Group not found):** `{ error: 'Group not found.' }`
  - **Failure (Channel not found):** `{ error: 'Channel not found in the given group.' }`
  - **Failure (Server Error):** `{ error: 'Internal server error' }`
- **Purpose:** The endpoint retrieves messages from a specified channel within a specified group. If the messages contain attachments, the file path for each attachment is also fetched and included in the message object. If either the group or channel is not found, appropriate error responses are returned. Any other errors result in a generic error message.

### `/update-groups`

- **HTTP Method:** POST
- **Parameters (body):**
  - `updatedGroup`: Object (Group details to be updated or inserted)
    - `_id` (optional for updates): MongoDB ObjectId (The ID of the group to update)
    - Other fields specific to the group schema (e.g., `groupName`, etc.)
- **Return Values:**
  - **Success:** `{ success: true, message: 'Group updated successfully.' }`
  - **Failure (Internal Server Error):** `{ success: false, message: 'Internal Server Error.' }`
- **Purpose:** This endpoint either updates an existing group in the 'groupData' collection based on the provided `_id`, or, if `_id` is not provided, inserts a new group. If an update or insert operation is unsuccessful, an error is thrown and handled appropriately.

### `/update-permission`

- **HTTP Method:** POST
- **Parameters (body):**
  - `newPermission`: Object
    - `username`: String (The username of the user whose permission needs to be updated)
    - `role` (optional unless invalidating the user): String (The new role to assign to the user)
    - `valid`: Boolean (If set to false, it means the user needs to be invalidated)
- **Return Values:**
  - **Success:** `{ success: true, message: 'User details updated successfully.' }`
  - **Failure (User not found):** `{ success: false, message: 'User not found.' }`
  - **Failure (Internal Server Error):** `{ success: false, message: 'Internal Server Error' }`
- **Purpose:** This endpoint updates a user's role or invalidates the user in the 'UserData' collection based on the provided `username`. If `valid` is set to false, the user will be invalidated. Otherwise, the user's role will be updated to the provided `role`. If the user is not found or there is any error during the update, an appropriate error message will be returned.

### `/uploadPhoto`

- **HTTP Method:** POST
- **Parameters (body):**
  - `username`: String (The username of the user uploading the photo)
  - `photo`: File (The photo to be uploaded)
- **Return Values:**
  - **Success (photo uploaded and path updated in database):** `{ success: true, message: 'File uploaded, renamed, and path updated in database successfully.' }`
  - **Failure (no photo provided):** `{ success: false, message: 'No photo provided.' }`
  - **Failure (error renaming the file):** `{ success: false, message: 'Error renaming the file.' }`
  - **Failure (error updating profile picture path in database):** `{ success: false, message: 'Error updating profile picture path in database.' }`
- **Purpose:** This endpoint allows a user to upload a profile photo. Upon receiving the photo, the server will rename the file based on the username and update the `profilePic` path for the given user in the 'UserData' collection. If any error occurs during the process, such as renaming the file or updating the database, an appropriate error message will be returned. If no photo is provided in the request, an error message indicating this will be returned.



---

## Node Server Architecture

**Built-in Modules:** 
- `fs` (File System)
- `http` (HTTP server and client)
- `path`

**Third-party Modules:** 
- `Express`
- `Bootstrap`
- `jQuery`

**Functions:**
- Callbacks
- Promises

**Files:**
- `Package.json` - contains meta information like package name, version, dependencies, scripts.


# Server Changes:

## Create User Component:

### onCreate() 
- POST – `create-user`
- Creates a new `User` object and appends to database. 
- **Frontend:** 
  - User Input fields
  - Checks that the username the user wants to change to is not already existing in database. 

## User Component: 

### updateUserRole() 
- POST – `update-permissions`
- Function change's role of selected user to a new role and updates that user in the database.
- **Frontend:** 
  - Dropdown Selection

### deleteUser() 
- POST – `update-permissions`
- Function changes `selectedUser.vaild = false` and updates database. 
- **Frontend:** 
  - Delete Button- only access by superAdmin
  - Front end only displays `users.vaild = true`

## Profile Component: 

### onSubmit()
- POST – `update-users`
- Function changes selectedUser values and updates database. 
- **Frontend:** 
  - User Inputs accessed by logged in user.
  - Checks that the username the user wants to change to is not already existing in database. 

### deleteProfile()
- POST – `update-permissions`
- Function changes `selectedUser.vaild = false` and updates database. 
- **Frontend:** 
  - Delete Button
  - Once deleted – navigate back to Login Page 

## Account Component: 

### getGroups()
- GET – `all-groups`
- Function gets all groups and filters them to only display the groups the user is a member of. Function also filters out off the `groups.vaild=false` because these are deleted groups. 
- **Frontend:** 
  - Clickable Cards and group names of the groups that have not been deleted and the logged in user is a member of. 

## Group Component: 

### requestButton() 
- POST – `update-groups`
- Function pushes loggedInUser.username into the Groups `userRequests []` and updates the database. 
- **Frontend:** 
  - Request Entry Button

### requestAdminButton() 
- POST – `update-groups`
- Function pushes loggedInUser.username into the Groups `useAdminRequests []` and updates the database. 
- **Frontend:** 
  - Only shows if `loggedInUser.role = admin`
  - Request Admin Button

### saveButton()
- POST- `update-groups`
- Function checks that the groupName is unique and assigns user inputs to `this.group` values. Function will assign loggedInUser.username to `this.group.createdBy`, `this.group.groupAdmin` and `this.group.members`. 
- **Frontend:** 
  - User Inputs 
  - Add Group Button 

### getGroups()
- GET  - `all-groups`
- Function will get all groups and filter them to:
  - `myGroups` = Groups loggedInUser is a groupAdmin for
  - `joinedGroups` =  Groups loggedInUser is a member of 
  - `otherGroups`  =  Groups loggedInUser is not a member. 

### deleteGroup()
- POST  - `update-groups`
- Function changes `selectedGroup.vaild = false` and updates database. 
- **Frontend:** 
  - Delete Button
  - Once deleted – update `getGroups()`

### approveRequests()
- POST  - `update-groups`
- Function moves loggedInUser.username from `group.userRequests` to `group.members`
- **Frontend:** 
  - Modal 
  - Only shown when `loggedInUser = admin` or `superAdmin`
  - Only shown to `groupAdmin` of selectedGroup
  - Approve Button.

### approveAdminRequests()
- POST  - `update-groups`
- Function moves loggedInUser.username from `group.adminRequests` to `group.groupAdmin`
- **Frontend:** 
  - Modal 
  - Only shown when `loggedInUser = superAdmin`
  - Approve Button.

## Channel Component

### getGroups()
- GET  - `all-groups`
- Function will get all groups and filter them to show all `group.channels` and split them:
  - `myChannels` = Channel loggedInUser is a member of
  - `toJoinChannels` =  Groups loggedInUser is not a member of.  

### removeUserFromChannel()
- POST  - `update-groups`
- Removes loggedInUser from `selectedGroup.channel` and updated database. 
- **Frontend:** 
  - Button

### addUserFromChannel()
- POST  - `update-groups`
- Adds loggedInUser to `selectedGroup.channel` and updated database. 
- **Frontend:** 
  - Button


# Angular architecture

## Components
- login
- create-user
- account(dashboard)
- users
- profilegroups
- channels
- chat

## Models

### userModel.ts:
```typescript
export class User {
    username: string;
    birthdate: string;
    age: number;
    email: string;
    password: string;
    pwdconfirm: string;
    role: number;
    group: number[];
    valid: boolean;
}
```

### userGroup.ts:
```typescript
export class Group {
    groupID: number;
    groupName: string;
    createdBy: string;
    adminRequests: string[];
    groupAdmins: string[];
    userRequests: string[];
    members: string[];
    channels: { [channelName: string]: string[]; }
    valid: boolean;
}
```

### messageModel.ts:
```typescript
export interface Message {
    username: string;
    message: string;
    channel: string;
    profilePic: string;
    attachment: number;
}
```

## Angular Services:

## SocketService:

This service provides utilities for real-time communication with the server using the socket.io library. It is designed to handle operations such as initializing the socket connection, joining chat channels, sending messages, and listening to incoming messages.

### Key Features:

- **initSocket()**: Initializes a socket connection to the server. If the socket is already initialized, this function ensures it doesn't initialize it again. It also provides a disconnection mechanism.
- **join(channel: string)**: Joins a chat channel by emitting a 'join' event.
- **send(message: string, channel: string, groupName: string, attachment: number)**: Sends a chat message, along with channel, user, and attachment information, if available.
- **isSocketInitialized()**: Checks if the socket is initialized.
- **getMessage()**: Listens to incoming chat messages and returns them as an observable for subscribers.

---

## UploadService:

This service handles file uploads to the server. It provides functionalities for uploading photos as well as attachments.

### Key Features:
- **uploadFile(data: FormData)**: Sends a POST request to upload a photo to the server.
- **uploadAttachment(formData: FormData)**: Sends a POST request to upload an attachment. The response is expected to be of type `UploadResponse`.

---

## UserDataService:

This service provides utilities for fetching user-related data from the server.

### Key Features:
- **getUserData()**: Sends a POST request to fetch data for all users from the backend.

---


## Routing
- Routes
- Router Links
- Activated Route

