import gql from "graphql-tag";

export default gql`
    mutation ($email:String!, $message:String!){
        sendMessage(email:$email, message: $message){
            _id
            user_id
            message
            createdOn    
        }
    }
`;