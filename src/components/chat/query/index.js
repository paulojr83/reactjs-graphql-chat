import gql from "graphql-tag";

export default gql`
    query {
        messages{
            _id
            user_id
            message
            createdOn
            user{
                name
                email
            }
        }
    }
`;