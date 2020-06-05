인터뷰 문제 기록
=====
.
- - -
## 목차
1. [자바](#자바)
2. [자바스크립트](#자바스크립트)
	1. [setTimeout](#setTimeout)
	2. ?
3. [스프링](#스프링)
4. [SQL](#SQL)
	1. [Equi join](#Equi-join)
	2. [Outer join](#Outer-join)
	3. [기타](#기타)
5. [알고리즘](#알고리즘)
6. [기타](#기타)

## 자바


##### [목차로 이동](#목차)

## 자바스크립트
### setTimeout
```javascript
function f() {
	for(var i = 1; i <=3; i++) {
		setTimeout(function() {
			alert(i)
		}, 1000);
	}
}
f();
```

한편 다음의 실행결과는 다르다.

```javascript
function f() {
	for(var i = 1; i <=3; i++) {
		setTimeout(alert(i)
		, 1000);
	}
}
f();
```

- - -
* [Scope](https://poiemaweb.com/js-scope)
* [스코프와 클로저](https://medium.com/@khwsc1/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-javascript-scope-and-closures-8d402c976d19)

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

<img src="./img/img_001.png" width="350" height="300"></br>

### Equi join


##### [목차로 이동](#목차)

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

<img src="./img/img_003.png" width="150" height="70"></br>

```SQL
-- DEPTNO 40이 0이어야 하는데 1 출력
SELECT DISTINCT b.DEPTNO
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
4. .

##### [목차로 이동](#목차)

### 기타
1. FK는 NULLABLE 가능
2. VIEW
3. 실행순서
4. https://docu94.tistory.com/84

##### [목차로 이동](#목차)

## 알고리즘


##### [목차로 이동](#목차)

## 기타


##### [목차로 이동](#목차)