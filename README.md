# 실행 흐름

```text
"FISA로 로그인" 클릭
    ↓
Auth Server(:9000) 로그인/동의 화면
    ↓
/api/auth/callback/fisa 로 code 전달
    ↓
auth.js가 /oauth2/token 호출해서 Access Token 교환
    ↓
jwt 콜백에서 accessToken, role, id 저장
    ↓
/dashboard 리다이렉트
```
