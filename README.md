## 프로젝트 소개
- 웹에서 채팅을 통해 생성되는 다양한 멀티미디어 자료를 AI를 활용하여 효과적으로 관리할 수 있는 메신저 플랫폼입니다.
- 다국어 사용자들을 위한 실시간 번역 서비스를 제공합니다.
- 업로드 된 이미지와 텍스트 채팅을 인공지능 모델을 통하여 벡터화 해서 검색이 가능하도록 합니다.


| 주요 기능 시연 영상                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <a href="https://www.youtube.com/watch?v=vbuXrG3HOkU"><img src="https://img.shields.io/badge/모델 시연 영상-ffffff?style=badge&logo=youtube&logoColor=red"/></a> |

## 개발 환경

| 분야       | 사용 기술                              |
|----------|------------------------------------|
| FrontEnd | React.js, Redux                    |
| BackEnd  | SpringBoot,JPA, FastAPI, SQLAlchemy |
| Database | Mysql, Milvus                      |
| DevOps   | AWS EC2, S3, AWS KMS, Docker       |
| TOOL     | VSCODE, InteliJ, Notion, Slack     |
| DESIGN   | Figma                              |



## 6. 프로젝트 구조

###  Front
```
.
├── README.md
├── components.json
├── config-overrides.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── package.json.bak
├── public
│   ├── index.html
├── src
│   ├── App.css
│   ├── App.js
│   ├── api
│   ├── components
│   │   ├── AudioRecorder
│   │   ├── channel
│   │   ├── chat
│   │   ├── hooks
│   │   ├── modals
│   │   ├── providers
│   │   └── ui
│   ├── hooks
│   ├── index.css
│   ├── index.js
│   ├── layouts
│   │   ├── IndexLayout
│   │   ├── LeftSide
│   │   ├── MainLayout
│   │   ├── RightSide
│   │   └── chat
│   ├── lib
│   │   ├── tokenUtils.js
│   │   └── utils.js
│   ├── modules
│   ├── page
│   └── store.js
└── tailwind.config.js
```

### Backend
```
└── DummyTalk_back
    ├── README.md
    ├── build.gradle
    ├── erd.mwb
    ├── gradle
    │   └── wrapper
    │       └── gradle-wrapper.properties
    ├── gradlew
    ├── gradlew.bat
    ├── http
    │   ├── Test.http
    │   └── chat.http
    ├── settings.gradle
    └── src
        ├── main
        │   ├── java
        │   │   └── com
        │   │       └── example
        │   │           └── DummyTalk
        │   │               ├── AES
        │   │               ├── Aws
        │   │               ├── Chat
        │   │               │   ├── Channel
        │   │               │   │   ├── Controller
        │   │               │   │   ├── Dto
        │   │               │   │   ├── Entity
        │   │               │   │   ├── Enum
        │   │               │   │   ├── Repository
        │   │               │   │   └── Service
        │   │               │   └── Server
        │   │               ├── Common
        │   │               │   ├── DTO
        │   │               │   ├── Entity
        │   │               │   └── WebSocket
        │   │               ├── Config
        │   │               │   ├── BeanConfiguration.java
        │   │               │   ├── JpaConfig.java
        │   │               │   ├── JwtSecurityConfig.java
        │   │               │   ├── SecurityConfig.java
        │   │               │   └── WebMvcConfig.java
        │   │               ├── DummyTalkApplication.java
        │   │               ├── Exception
        │   │               ├── Jwt
        │   │               ├── Mail
        │   │               │   ├── Controller
        │   │               │   └── Service
        │   │               ├── User
        │   │               │   ├── Controller
        │   │               │   ├── DTO
        │   │               │   ├── Entity
        │   │               │   ├── Repository
        │   │               │   └── Service
        │   │               └── Util
        │   └── resources
        │       ├── application-server.properties
        │       ├── application.properties
        │       └── static
        └── test
```
