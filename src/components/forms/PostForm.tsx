import React, { useState } from "react";
import { Button, Row, Form, Col } from "react-bootstrap";
import Map from "../Map";
import { IPost } from "../../models/Post";
import ImageDropzone from "../ImageDropzone";
import { useFetch } from "../../hooks/useFetch";
import { usePosts } from "../../contexts/PostsContext";

interface IPostFormProps {
  lat: number;
  lng: number;
}

const PostForm = ({ lat, lng }: IPostFormProps) => {
  // Store post model and form values
  const [files, setFiles] = useState<File[]>([]);
  const [postFormData, setPostFormData] = useState<any>({});
  const [invokeFetch, setInvokeFetch] = useState(false);
  const [postDetails, setPostDetails] = useState<IPost>({
    name: "",
    description: "",
    date_missing: new Date(),
    pictures: "",
    found: false,
    lat: lat,
    lng: lng,
  });

  // Store the date_missing field in a string for display
  const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [missingDateString, setMissingDateString] = useState(
    dateToString(new Date())
  );

  // useFetch success callback
  const { getPosts } = usePosts();
  const postSuccess = (_: IPost) => {
    getPosts();
  };

  // useFetch hook. Invoke on form submit
  const { loading, error } = useFetch<IPost>(
    invokeFetch,
    setInvokeFetch,
    "posts",
    postFormData,
    true,
    postSuccess
  );

  // Handle form submit. Append form data and invoke fetch hook
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", postDetails.name);
    formData.append("description", postDetails.description);
    formData.append("lat", String(postDetails.lat));
    formData.append("lng", String(postDetails.lng));
    formData.append(
      "date_missing",
      postDetails.date_missing instanceof Date
        ? postDetails.date_missing.toISOString()
        : new Date().toISOString()
    );
    formData.append("found", String(postDetails.found));
    for (const file of files) {
      formData.append("files", file);
    }

    setPostFormData(formData);
    setInvokeFetch(true);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files : value;

    setPostDetails((prevPostDetails) => ({
      ...prevPostDetails,
      [name]: newValue,
    }));

    if (name === "date_missing") {
      const newDate = new Date(value);
      setMissingDateString(dateToString(newDate));
    }
  };

  // Update post coords
  const setLatLng = (newLat: number, newLng: number) => {
    setPostDetails((prevPostDetails) => ({
      ...prevPostDetails,
      lat: newLat,
      lng: newLng,
    }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              required
              name="name"
              placeholder="Cats Name"
              value={postDetails.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
          <Col>
            <Form.Control
              name="date_missing"
              type="date"
              placeholder="Missing since"
              value={missingDateString}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Control
              name="description"
              placeholder="Description"
              as="textarea"
              rows={3}
              value={postDetails.description}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
        </Row>

        <Row>
          <Col disabled={loading}>
            <Map
              style={{ width: "100%", height: "200px", borderRadius: "5px" }}
              lat={lat}
              lng={lng}
              setLatLng={setLatLng}
              minZoom={5}
              formMap={true}
            />
          </Col>
        </Row>

        <Row>
          <Col disabled={loading}>
            <ImageDropzone files={files} setFiles={setFiles} />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </Col>
          {error && (
            <Col>
              <p className="form-error-text">Error submitting post.</p>
            </Col>
          )}
        </Row>
      </Form>
    </>
  );
};

export default PostForm;
