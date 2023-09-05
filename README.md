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

## Development Process

1. **Branch Creation**: Whenever a new feature or functionality is to be added, a new branch is created from the main branch.
2. **Development**: All the development activities, be it coding, initial testing, or UI enhancements, happen within these feature branches.
3. **Multiple Commits**: Multiple commits to the current branch are made until branch is fully functional. 
4. **Merging**: Once the feature is tested and deemed stable, the feature branch is merged into the main branch.
5. **Repeat Step 1 - 4**: I repeated these steps until the system is fully functional. 

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

## Server Side Routes

### Route: getUsers.js
- **HTTP Method:** POST
- **Parameters:**
  - `username`: A string representing the username.
  - `pwd`: A string representing the password.
- **Purpose:** Reads the usersData.json file and returns a list of all users.
- **Return Values:**
  - **Success:** An array of user objects.
  - **Error:** An object with `ok` set to false and an associated error message: `'Internal Server Error'`.

### Route: getGroups.js
- **Parameters:**
  - `username`: A string representing the username.
  - `pwd`: A string representing the password.
- **Purpose:** Reads the groupData.json file and returns a list of all groups.
- **Return Values:**
  - **Success:** An array of group objects.
  - **Error:** An object with `ok` set to false and an associated error message: `'Internal Server Error'`.

### Route: postCreateUser.js
- **HTTP Method:** POST
- **Parameters:** A JSON body containing the new user details:
  - `username`: A string representing the username.
  - `email`: A string representing the user's email.
  - `password`: A string representing the user's password.
  - `birthdate`: A string representing the user's date of birth.
- **Purpose:** Validates the new user's data, calculates their age, checks if the user already exists, and then adds the new user to the usersData.json file.
- **Return Values:**
  - **Success:** An object with `success` set to true and a success message: `'User created successfully.'`.
  - **User already exists:** An object with `success` set to false and an error message: `'Username or Email already exists.'`.
  - **Missing fields:** An object with `success` set to false and an error message: `'All fields are required.'`.
  - **Error writing or reading file:** An object with `success` set to false and an error message: `'Internal Server Error'`.

### postLogin.js
- **HTTP Method:** POST
- **Parameters:**
  - `username`: String
  - `pwd`: String (Password)
- **Return Values:**
  - **Success:** `{ ok: true, user: foundUser }`
  - **Failure:** `{ ok: false }`
- **Purpose:** Authenticates a user based on provided username and password. If matched, returns the user data.

### updateGroups.js
- **HTTP Method:** POST
- **Parameters:**
  - `updatedGroup`: Object (Details about the group, including the groupID and members)
- **Return Values:**
  - **Success:** `{ success: true, message: 'Group and User details updated successfully.' }`
  - **Failure:** Various error messages depending on the specific issue.
- **Purpose:** Updates the group details based on the provided group data. If the group does not exist, it will be added. Also updates user's group membership details.

### updatePermission.js
- **Route:** `/updatePermission`
- **HTTP Method:** POST
- **Parameters:**
  - `newPermission`: Object (Details about the user's permission, including username, role, and valid)
- **Return Values:**
  - **Success:** `{ success: true, message: 'User details updated successfully.' }`
  - **Failure:** Various error messages depending on the specific issue.
- **Purpose:** Updates the user's role and validity status based on provided details.

### updateUser.js
- **Route:** `/updateUser`
- **HTTP Method:** POST
- **Parameters:**
  - `originalUsername`: String
  - `updatedDetails`: Object (New details about the user including username, email, userbirthdate, password, pwdconfirm)
- **Return Values:**
  - **Success:** `{ success: true, message: 'User details updated successfully.' }`
  - **Failure:** Various error messages depending on the specific issue.
- **Purpose:** Updates the details of an existing user based on the provided updated details.

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
- `userData.json` - contains objects of User Data including; username, birthdate, age, email, password, role, group, valid.
- `groupData.json` – contains objects of Group Data including groupID, GroupName, createdBy, adminRequests, groupAdmins, userRequests, members, channels, valid. 

# Server Changes:

## Directly on Server: 

### Get Usernames 
- Function to retrieve all the usernames in `UserData.json` to use in `create-user` component. Component cross-references stored usernames with user input to ensure user cannot create an account with the same username as an existing username. Makes all username unique. 

### Get Groups 
- Function to retrieve all the usernames in `GroupData.json` to use in `groups` component. Component cross-references stored groupNames with user input to ensure user cannot create a group with the same groupName as an existing stored groupName. Makes all groupName unique. 

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
- POST – `all-groups`
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
- POST  - `all-groups`
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
- POST  - `all-groups`
- Function will get all groups and filter them to show all `group.channels` and split them:
  - `myChannels` = Channel loggedInUser is a member of
  - `toJoinChannels` =  Groups loggedInUser is not a member of.  

### removeUserFromChannel()
- POST  - `all-groups`
- Removes loggedInUser from `selectedGroup.channel` and updated database. 
- **Frontend:** 
  - Button

### addUserFromChannel()
- POST  - `all-groups`
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

## Routes
- Routes
- Router Links
- Activated Route

