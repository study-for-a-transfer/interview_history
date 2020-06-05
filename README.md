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


##### [목차로 이동](#목차)

## 알고리즘


##### [목차로 이동](#목차)

## 기타


##### [목차로 이동](#목차)