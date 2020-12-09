# docker - travis - elastic beanstalk 배포

## AWS EB의 Dockerrun.aws.json 구문 설명

```json
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      // 컨테이너명
      "name": "frontend",

      // Docker 레포지토리 이미지명
      "image": "chane81/docker-frontend",

      // 호스트명
      // 이 이름을 이용해 도커 컴포즈를 이용해 생성된 다른 컨테이너에 접근이 가능함
      // 다른 컨테이너에서 접근할 이름
      "hostname": "frontend",

      // 컨테이너가 실패할 시 다른 작업도 중지해야 하면 true
      // ex) nginx의 경우는 true설정 (다른 컨테이너에 영향을 미치므로)
      "essential": false,

      // 컨테이너가 사용할 최대 메모리
      "memory": 128,

      // 포트매핑
      "portMappings":[
        {
          // 외부 노출 포트
          "hostPort": 80,

          // 컨테이너 포트
          "containerPort": 80
        }
      ],

      // 연결할 컨테이너의 목록
      // 연결된 컨테이너는 서로를 검색하고 안전하게 통신함
      // ex) nginx의 경우 frontend, backend 를 모두 연결해야하므로
      //     아래처럼 설정
      "links": ["frontend", "backend"]
    }
  ]
}
```
