import React from "react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphQL";

const PostForm = () => {

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ""
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            // Access proxy: CACHE is immutable in V.3
            const current_data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })

            // Copy an object instance of current data before any mutations
            let data = {...current_data};

            // Mutate
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            values.body = "";
        },
        onError(error) {
            console.log(error);
        }
    })

    function createPostCallback() {
        createPost();
    }

    return(
        <form className="form-02" onSubmit={(event)=>onSubmit(event)}>
            <h2 className="form-02-title">Create a post:</h2>
            <div className="form-02-grp">
                <input
                    id="form-02-input"
                    className={error ? "form-02-input form-02-input-error" : "form-02-input"}
                    placeholder="Hi World!"
                    name="body"
                    onChange={(event)=>onChange(event)}
                    value={values.body}
                />
                {error && (
                    <ul className="form-02-error">
                        <li className="form-02-error-p">{error.graphQLErrors[0].message}</li>    
                    </ul>
                )}
                <button className="form-02-submit">Submit</button>
            </div>
        </form>
    )    
}

const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body: String!
    ) {
        createPost(
            body: $body
        ) {
            id
            userId
            username
            createdAt
            body
            likeCount
            commentCount
            comments {
                id
                userId
                username
                createdAt
                body
            }
            likes {
                id
                userId
                username
                createdAt
            }
        }
    }
`

export default PostForm;