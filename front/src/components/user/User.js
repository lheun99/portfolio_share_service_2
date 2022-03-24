import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Badge } from "react-bootstrap";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const colorChange = () => {
    if (user?.job === "프론트엔드") {
      return "info";
    } else if (user?.job === "백엔드") {
      return "dark";
    } else if (user?.job === "데이터 분석") {
      return "success";
    } else if (user?.job === "AI") {
      return "warning";
    } else if (user?.job === "기타") {
      return "secondary";
    } else {
      return null;
    }
  };

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            onClick={() =>
              isEditable ? navigate(`/users/${user.id}/profilePage`) : undefined
            }
            style={{ width: "9rem", height: "9rem", cursor: "pointer", borderRadius:72,margin:0,padding:0,}}
            className="mb-3"
            src={user?.profile}
            alt="사용자 프로필"
          />
        </Row>
        <Card.Title style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
          {user?.name}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{textAlign:"center"}}>
          {user?.email}
          <h6 style={{ margin: "2px 5px" }}>
            <Badge pill bg={colorChange()}>
              {" "}
              {user?.job}
            </Badge>
          </h6>
        </Card.Subtitle>
        <Card.Text style={{borderTop:"grey solid 1px", padding:5,}}>{user?.description}</Card.Text>
        <Row>
          <Col>
            {user?.github && (
              <a href={user?.github} style={{ color: "black" }}>
                <i className="fa-brands fa-github"></i>
              </a>
            )}
          </Col>
          <Col>
            {user?.gitlab && (
              <a href={user?.gitlab} style={{ color: "black" }}>
                <i className="fa-brands fa-gitlab"></i>
              </a>
            )}
          </Col>
          <Col>
            {user?.twitter && (
              <a href={user?.twitter} style={{ color: "black" }}>
                <i className="fa-brands fa-twitter"></i>
              </a>
            )}
          </Col>
          <Col>
            {user?.instagram && (
              <a href={user?.instagram} style={{ color: "black" }}>
                <i className="fa-brands fa-instagram"></i>
              </a>
            )}
          </Col>
          <Col>
            {user?.youtube && (
              <a href={user?.youtube} style={{ color: "black" }}>
                <i className="fa-brands fa-youtube"></i>
              </a>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default User;
