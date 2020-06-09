인터뷰 문제 기록
=====
.
- - -
## 목차
1. [자바](#자바)
2. [자바스크립트](#자바스크립트)
	1. [동작원리](#동작원리)
	2. [setTimeout](#setTimeout)
	3. [변수 할당](#변수-할당)
	4. [this](#this)
	5. [--](#--)
3. [스프링](#스프링)
4. [SQL](#SQL)
	1. [Outer join](#Outer-join)
	2. [--](#--)
5. [알고리즘](#알고리즘)
6. [기타](#기타)

## 자바


##### [목차로 이동](#목차)

## 자바스크립트
### 동작원리
자바스크립트의 런타임에 대해 이해하기 위해서는 먼저 브라우저에 대해 살펴볼 필요가 있다. 브라우저는 크게 두 가지로 나뉜다.

1. 렌더링 엔진[1]
2. 자바스크립트 엔진[2]

이름에서도 알 수 있듯 자바스크립트의 처리를 자바스크립트 엔진이 담당하며, 이중 유명한 것이 구글의 V8엔진[3]이다. V8엔진은 크게 두 부분으로 구성된다.

1. 메모리 힙(Memory Heap)
2. 콜스택(Call Stack)

여기서 의아한 것은 자바스크립트 개발자가 흔히 사용하는 API(ex. `setTimeout`)는 V8엔진이 제공하는 것이 아니란 것이다. 그렇다면 이들은 어디에 구현되어 있을까?

<img src="./img/img_004.png" width="400" height="250"></br>

위에서 보듯, V8엔진 외에 브라우저가 제공하는 웹 API가 있어 DOM, AJAX, `setTimeout` 등을 제공하는 것이다.

한편 자바스크립트는 싱글 스레드 언어, 즉 다시 말해 콜스택[4]이 하나이다. 따라서 한 번에 하나의 일만 처리할 수 있다. 이러한 단일 스레드 기반의 코딩 환경은 장점(ex. 멀티 스레드 환경에서의 `deadlocks` 같은 상황 신경쓸 필요 없음)도 존재하나, 제한점도 존재한다. 바로 특정 코드 실행이 늦어지는, 즉 콜스택 내 수행시간이 긴 함수가 있는 경우다. 예로 브라우저가 응답없음 상태에 빠지는 경우를 들 수 있는데, 이를 블로킹[5]되었다고 한다. 그럼 이때 해결책은 무엇일까? 바로 비동기 콜백(Asynchronous Callbacks)이다. 다시 말하면 나중에 실행될 콜백함수를 이용하는 것인데, 이는 즉시 호출 스택(Call Stack)에 쌓이지 않고 이벤트 큐(Evenet Queue)[6]에서 기다렸다가 호출 스택이 비어 있는 시점에 실행된다. 간단한 예는 아래와 같다.

```javascript
setTimeout(function() {
	console.log("first");
}, 0);
console.log("second");
```

실행 순서는 아래와 같다.

1. `setTimeout`은 호출 스택(Call-Stack)에서 실행된 후 웹 API의 Timer API를 호출한다
2. 웹 API에 의해 `setTimeout`의 콜백 함수는 이벤트 큐(Event Queue)에 밀어 넣어진다
3. `console.log("second")`가 호출 스택에 쌓이고 실행 후 호출 스택이 비었을 때 콜백 함수가 호출 스택으로 온다

- - -
1. 렌더링 엔진
	* 서버로부터 받은 HTML, CSS는 브라우저 렌더링 엔진의 HTML 파서, CSS 파서에 의해 렌더 트리로 결합된다
	* 브라우저는 렌더 트리를 기반으로 웹페이지를 표시한다
2. 자바스크립트 엔진
	* 자바스크립트의 처리, 즉 JS로 작성한 코드를 해석하고 실행하는 인터프리터다
	* 렌더링 엔진의 HTML 파서가 DOM 생성 프로세스를 하던 중 스크립트 태그를 만나면 자바스크립트 엔진에게 제어권한을 넘겨준다
3. V8엔진
	* 크롬과 노드JS에서 사용된다
4. 콜스택
	* 콜스택의 각각은 스택프레임(Stack Frame)이라고 부른다
	* 이는 예외가 발생했을 때 스택 트레이스가 만들어지는 방식이다  
	(스택 트레이스란 예외가 발생했을 때 콜스택의 상태이다)
5. 블로킹
	* 콜스택에 수행할 함수가 있으면 브라우저는 아무 것도 할 수 없다
	* 즉 렌더링을 할 수도 없고, 다른 코드를 수행할 수도 없는 끼어 있는 상황이 된다
	* 이는 부드러운 UI가 표현되기를 원하는 경우 문제가 될 수 있다
6. 이벤트 큐
	* 자바스크립트 런타임 환경의 이벤트 큐는 처리할 메세지 목록 및 실행할 콜백 함수들의 리스트이다
	* DOM 이벤트, HTTP 요청, `setTimeout` 같은 비동기 함수는 웹 API를 호출하며 웹 API는 콜백 함수를 이벤트 큐에 밀어 넣는다
7. 참고문서
	* [자바스크립트는 어떻게 작동하는가: 엔진, 런타임, 콜스택 개관](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%97%94%EC%A7%84-%EB%9F%B0%ED%83%80%EC%9E%84-%EC%BD%9C%EC%8A%A4%ED%83%9D-%EA%B0%9C%EA%B4%80-ea47917c8442)
	* [자바스크립트는 어떻게 작동하는가: V8엔진의 내부 + 최적화된 코드 작성을 위한 다섯 가지 팁](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-v8-%EC%97%94%EC%A7%84%EC%9D%98-%EB%82%B4%EB%B6%80-%EC%B5%9C%EC%A0%81%ED%99%94%EB%90%9C-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%9E%91%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-%ED%8C%81-6c6f9832c1d9)
	* [자바스크립트 엔진과 구조](https://velog.io/@imacoolgirlyo/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%97%94%EC%A7%84-Event-Loop-Event-Queue-Call-Stack)

##### [목차로 이동](#목차)

### setTimeout
```javascript
function f() {
	for(var i = 1; i <=3; i++) {
		setTimeout(function() {
			alert(i)
		}, 1000);
	}
}
f();	// 4, 4, 4
```

한편 다음의 실행결과는 다르다.

```javascript
function f() {
	for(var i = 1; i <=3; i++) {
		setTimeout(alert(i)
		, 1000);
	}
}
f();	// 1, 2, 3
```

먼저 첫 번째 실행 결과에 대해 이해하기 위해 세 가지를 알아야 한다.

1. `setTimeout` 같은 비동기 함수는 웹 API를 호출한다
2. 웹 API는 콜백 함수를 이벤트 큐에 밀어 넣는다
	* 즉, `setTimeout`의 첫 번째 매개변수는 함수의 참조값(실행문 X)이어야 한다
	* 1초의 시간은 콜백 함수가 이벤트 큐에 들어가는 기준이므로 처음에만 존재한다
3. 자바스크립트의 변수 스코프는 함수 블록 단위이다(ECMAScript5 이하)
	* 따라서 익명 함수 내부 선언 변수가 없으므로 이후에 f 함수에서 찾게 되는데 i는 4이다

반면 두 번째 실행 결과는 `setTimeout`의 인자로 함수 실행문이 전달되었으므로 1초 뒤가 아닌 즉시 실행된다고 이해했다.

- - -
1. `setTimeout`
	* [스케줄링: `setTimeout`과 `setInterval`](https://ko.javascript.info/settimeout-setinterval)
2. Scope
	* [Scope](https://poiemaweb.com/js-scope)
	* [스코프와 클로저](https://medium.com/@khwsc1/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-javascript-scope-and-closures-8d402c976d19)

##### [목차로 이동](#목차)

### 변수 할당
다음 글([메서드와 `this`](https://ko.javascript.info/object-methods))을 보고 정리한다. 먼저 `user` 객체의 메서드를 정의할 수 있는 두 가지 방법이 있다.

1. 방법 1  
	```javascript
	let user = {
		name: "John",
		age: 30,

		sayHi() {
			// 'this'는 '현재 객체'를 나타냅니다.
			alert(this.name);
		}
	};
	```
2. 방법 2  
	```javascript
	let user = {
		name: "John",
		age: 30,

		sayHi() {
			alert(user.name); // 'this' 대신 'user'를 이용함
		}
	};
	```

즉 이처럼 보통 메서드의 경우 객체에 저장된 정보를 활용하는 경우가 많은데 두 번째 방법처럼 `this`를 사용하지 않고 외부 변수를 참조해 객체에 접근하는 것도 가능[1]하다. 하지만 외부 변수를 참조해 객체에 접근하는 경우 문제가 있다.

```javascript
let user = {
	name: "John",
	age: 30,

	sayHi() {
		alert( user.name );	// Error: Cannot read property 'name' of null
	}
};


let admin = user;
user = null;	// user를 null로 덮어씁니다[2].

admin.sayHi();	// sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
```

실행결과를 살펴보자.

<img src="./img/img_005.png" width="500" height="350"></br>

`admin` 객체의 `sayHi` 메서드가 `user.name`을 바라보는 것을 확인할 수 있다. 만약 `this`를 이용해 구현했다면 이러한 문제는 발생하지 않았을 것이다.

```javascript
let user = {
	name: "John",
	age: 30,

	sayHi() {
		alert( this.name );
	}
};


let admin = user;
user = null;

admin.sayHi();
```

- - -
1. 호이스팅
	* 메서드 정의에서 외부의 변수를 사용할 수 있는 이유는 변수 호이스팅으로 인해 `user`가 이미 선언되었기 때문이라고 이해
	* let인데 맞나?
	* 참고
		* [`let`, `const`와 블록 레벨 스코프](https://poiemaweb.com/es6-block-scope)
2. `admin` 변수는 왜 null이 아닌가?
	* 자바에서 이미 많이 고민했음에도 불구하고 혼동했던 부분이 `admin` 변수가 primitive가 아닌 reference 타입인데 왜 `user`를 따라 변하지 않지? 자바스크립트라 자바와 다른가? 하는 부분이었다.
	* 결론을 말하자면 아니다. 자바로 해봤으나 결과는 동일하고, 변화를 같이 가져가기 위해서는 주소값을 바꾸면 안 되고 내부 속성을 바꿔주어야 한다.
3. .

##### [목차로 이동](#목차)

### this
다른 언어를 사용하다 자바스크립트로 넘어온 개발자는 `this`를 혼동하기 쉽다. 예를 들면 bound this, 즉 `this`가 항상 메서드가 정의된 객체를 참조할 것이라고 착각한다. 하지만 자바스크립트의 `this`는 다른 프로그래밍 언어의 `this`와 동작 방식이 다르다.

자바스크립트에서 `this`는 런타임에 결정된다. 따라서 함수(메서드)를 하나만 만들어 여러 객체에서 재사용할 수 있다는 것은 장점이다. 메서드가 어디서 정의되었는지에 상관없이 `this`는 점 앞의 객체가 무엇인가에 따라 자유롭게 결정되기 때문이다. 물론 이런 유연함이 실수로 이어질 수 있다는 것이 단점이다. 

```javascript
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
	alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)
```

단 예외가 있다. 화살표 함수의 경우 일반 함수와는 달리 고유한 `this`를 가지지 않는다. 화살표 함수에서 `this`를 참조하면, 화살표 함수가 아닌 평범한 외부 함수에서 `this` 값을 가져온다.

```javascript
```

. 한편 핸들러 내부의 `this` 값 또한 다음과 같이 다를 수 있다.

- - -
* 참고
	* [메서드와 `this`](https://ko.javascript.info/object-methods)
	* [화살표 함수 다시 살펴보기](https://ko.javascript.info/arrow-functions)
	* [`EventTarget.addEventListener()`](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener)

##### [목차로 이동](#목차)

### --
* https://poiemaweb.com/es6-arrow-function
* https://ifuwanna.tistory.com/13
* 참고문서
	* [모던 JavaScript 튜토리얼](https://ko.javascript.info/)

##### [목차로 이동](#목차)

### ?
```javascript
char[] arr = someString.toCharArray();
StringBuffer sb = new StringBuffer();
int size = 0;
for(char c : arr) {
	size += (c > 255) ? 2 : 1;
	sb.append(c);
	if(size >= 80) {
		break;
	}
}
return sb.toString();
```

- - -
* [--](https://stackoverflow.com/questions/4547609/how-do-you-get-a-string-to-a-character-array-in-javascript/4547628)

##### [목차로 이동](#목차)

## 스프링


##### [목차로 이동](#목차)

## SQL
사원정보를 담은 EMP 테이블과 부서정보를 담은 DEPT 테이블이 각각 아래와 같다.

| COLUMN_NAME | DATA_TYPE | NULLABLE |
| -- | -- | -- |
| EMPNO | NUMBER(4,0) | NO |
| ENAME | VARCHAR2(10 BYTE) | YES |
| JOB | VARCHAR2(9 BYTE) | YES |
| MGR | NUMBER(4,0) | YES |
| HIREDATE | DATE | YES |
| SAL | NUMBER(7,2) | YES |
| COMM | NUMBER(7,2) | YES |
| DEPTNO | NUMBER(2,0) | YES |

| COLUMN_NAME | DATA_TYPE | NULLABLE |
| -- | -- | -- |
| DEPTNO | NUMBER(2,0) | YES |
| DNAME | VARCHAR2(14 BYTE) | YES |
| LOC | VARCHAR2(13 BYTE) | YES |

각 테이블에 담긴 데이터는 아래와 같다.

<img src="./img/img_001.png" width="380" height="310"></br>

### Outer join
<img src="./img/img_002.png" width="250" height="250"></br>

```SQL
SELECT a.EMPNO
    , a.ENAME
    , b.DNAME
    , b.DEPTNO
FROM EMP a
    , DEPT b
WHERE a.DEPTNO = b.DEPTNO(+)
ORDER BY a.DEPTNO ASC;

-- Oracle9i부터는 ANSI/ISO SQL 표준인 LEFT/RIGHT/FULL OUTER JOIN을 지원한다
SELECT a.EMPNO
    , a.ENAME
    , b.DNAME
    , b.DEPTNO
FROM EMP a
LEFT OUTER JOIN DEPT b
    ON a.DEPTNO = b.DEPTNO
ORDER BY a.DEPTNO ASC;
```

<img src="./img/img_003.png" width="170" height="75"></br>

```SQL
-- 정답
SELECT A.DEPTNO
    , A.DNAME
    , COUNT(B.EMPNO) AS CNT
FROM DEPT A
LEFT OUTER JOIN EMP B
ON A.DEPTNO = B.DEPTNO
GROUP BY A.DEPTNO, A.DNAME
ORDER BY A.deptno;

-- 오답: DEPTNO 40이 0이어야 하는데 1 출력
SELECT b.DEPTNO
    , b.DNAME
    , COUNT(*) "인원수"
FROM EMP a
    , DEPT b
WHERE a.DEPTNO(+) = b.DEPTNO
GROUP BY b.DEPTNO
    , b.DNAME
ORDER BY b.DEPTNO ASC;
```

- - -
1. 조인 시 값이 없는 조인 측에 `(+)`를 위치시킨다
2. ORA-01791: not a SELECTed expression
	* DISTINCT를 사용할 경우 ORDER BY에 쓸 컬럼은 SELECT 컬럼절에 기술되어야 한다
3. DISTINCT는 한 개의 칼럼에만 별도로 적용되지 않는다
4. [ANSI SQL](https://sophia2730.tistory.com/entry/Oracle-ANSI-SQL%EA%B3%BC-INNEROUTER-JOIN-%EC%B0%A8%EC%9D%B4)
5. .

##### [목차로 이동](#목차)

### --
1. FK는 NULLABLE 가능
2. VIEW
3. 실행순서
4. https://docu94.tistory.com/84

##### [목차로 이동](#목차)

## 알고리즘
1. [1, 3, 4, 6] -> 2
2. task package  
	```txt
	process: [20, 50, 30]
	speed: [10, 20, 40]
	
	-> [8, 3, 2]
	-> [3]
	```
3. 1000100001 -> 4(MAX)
4. .
- - -
1.

##### [목차로 이동](#목차)

## 기타
* [CI/CD란?](https://itholic.github.io/qa-cicd/)
* .

##### [목차로 이동](#목차)