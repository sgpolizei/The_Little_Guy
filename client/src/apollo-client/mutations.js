import { gql } from '@apollo/client';

/** LOGIN */
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        username
        is_landlord
        image
        email
        bio
        image
        addressStreet
        addressCity
        addressState
        addressZip
        current_property {
            owner {
                firstName
                lastName
                username
            }
            addressStreet
            addressCity
            addressState
            addressZip
            price
            images
            description
        }
      }
    }
  }
`;

/** USER MUTATIONS */

export const SIGN_UP = gql`
 mutation(
   $firstName: String!,
   $lastName: String!,
   $email: String!,
   $password: String!,
   $username: String!,
   $image: String,
   $is_landlord: Boolean
   ){
    signUp(input: {
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password,
      username: $username,
      image: $image,
      is_landlord: $is_landlord
    }) {
      token
      user {
        _id
        firstName
        lastName
        username
        bio
        email
        image
        is_landlord
        current_property {
            owner {
                firstName
                lastName
                username
            }
            addressStreet
            addressCity
            addressState
            addressZip
            price
            images
            description
        }
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
mutation($email: String!, $password: String!, $newPassword: String!) {
  changePasssword(email: $email, password: $password, newPassword: $newPassword) {
    _id
  }
}`;

export const UPDATE_USER = gql`
mutation($firstName: String, $lastName: String, $bio: String, $image: String){
  updateUser(input: {
    firstName: $firstName, lastName: $lastName, bio: $bio, image: $image}) {
      firstName
      lastName
      bio
      image
    }
  }
`;

/** IMAGE MUTATIONS */

export const ADD_USER_IMAGE = gql`
mutation( $cloudinaryId: String) {
  addUserImage(cloudinaryId: $cloudinaryId)
}`;

export const ADD_PROPERTY_IMAGE = gql`
mutation($_id: ID!, $cloudinaryId: String) {
  addPropertyImage(_id: $_id, cloudinaryId: $cloudinaryId)
}`;

export const UPLOAD_IMAGE = gql`
  mutation($image:String!){
    uploadImage(image: $image)
  }`;

/** PROPERTY MUTATIONS */

export const ADD_PROPERTY = gql`
mutation(
    $addressStreet: String,
    $addressCity: String,
    $addressState: String,
    $addressZip: String,
    $price: Int,
    $description: String,
) {
  addProperty(
    input: {
    addressStreet: $addressStreet,
    addressCity: $addressCity,
    addressState: $addressState,
    addressZip: $addressZip,
    price: $price,
    description: $description
  }) {
    _id
  }
}
`;

export const UPDATE_PROPERTY = gql`
mutation(
    $_id: ID!,
    $addressStreet: String,
    $addressCity: String,
    $addressState: String,
    $addressZip: String,
    $price: Int,
    $description: String
 ) {
  updateProperty(input: {
    _id: $_id,
    addressStreet: $addressStreet,
    addressCity: $addressCity,
    addressState: $addressState,
    addressZip: $addressZip,
    price: $price,
    description: $description
  }) {
    _id
  }
 }`;

export const DELETE_PROPERTY = gql`
mutation(
    $_id: ID!
) {
  deleteProperty(_id: $_id) {
    _id
  }
}`;

export const UPDATE_TENANT = gql`
mutation($_id: ID!, $tenant: ID!) {
  updateTenant(_id: $_id, tenant: $tenant) {
    _id
  }
}`;

/** APPLICATION MUTATIONS */

export const ADD_APPLICATION = gql`
  mutation($input: NewApplicationInput!){
    newApplication(input:$input) {
      _id
    }
  }
`;

export const UPDATE_APPLICATION = gql`
  mutation($_id: ID!, $status: String!){
    updateApplication(_id: $_id, status: $status) {
      _id
    }
  }
`;