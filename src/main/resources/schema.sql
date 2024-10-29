drop database if exists betnet;
create database betnet;
use betnet;

drop table if exists teams;
create table teams (
    teamcode int auto_increment primary key,
    teamname varchar(100) not null
);

drop table if exists members;
create table members (
    memberid int auto_increment primary key,
    username varchar(50) not null unique,
    password varchar(255) not null,
    name varchar(100) not null,
    contact varchar(20),
    email varchar(255) unique not null,
    gender char(1),
    age int,
    joindate date not null default (current_date),
    teamcode int,
    account varchar(255),
    foreign key(teamcode) references teams(teamcode)
    on update cascade
    on delete cascade
);


drop table if exists teamboard;
create table teamboard (
    postid int auto_increment primary key,
    memberid int not null,
    teamcode int not null,
    content longtext not null,
    title varchar(255) not null,
    createdat date not null default (current_date),
    views int default 0,
    foreign key (memberid) references members(memberid)
    on update cascade
    on delete cascade,
    foreign key (teamcode) references teams(teamcode)
    on update cascade
    on delete cascade
);

drop table if exists comments;
create table comments (
    commentid int auto_increment primary key,
    memberid int not null,
    postid int not null,
    commentindex int not null,
    createdat date not null default (current_date),
    content text not null,
    foreign key (memberid) references members(memberid)
    on update cascade
    on delete cascade,
    foreign key (postid) references teamboard(postid)
    on update cascade
    on delete cascade
);

-- 포인트로그 테이블
drop table if exists PointLogs;
CREATE TABLE PointLogs (
    PointLogID INT AUTO_INCREMENT PRIMARY KEY,  -- 포인트 로그 고유 번호 (기본 키, 자동 증가)
    MemberID INT NOT NULL,                     -- 포인트가 증감된 회원의 번호 (외래 키)
    LogDate DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP), -- 포인트 증감 발생 날짜
    PointChange INT NOT NULL,                  -- 포인트 증감량 (증가일 경우 양수, 감소일 경우 음수)
    Description int NOT NULL,         -- 포인트 증감 내역 1:  충전, 2: 배당금지급, 3: 게임구매, 4: 포인트출금, 5: 로그인, 6: 게시글작성, 7: 댓글 작성, 8: 광고 클릭
    FOREIGN KEY (MemberID) REFERENCES Members(MemberID)
    ON UPDATE CASCADE
    ON DELETE CASCADE                          -- 회원 테이블의 외래 키
);

-- 게시판 추천로그 테이블
drop table if exists boardlikelog;
CREATE TABLE boardlikelog (
    boardlikelogid INT AUTO_INCREMENT PRIMARY KEY,  -- 마일리지 로그 고유 번호 (기본 키, 자동 증가)
    MemberID INT NOT NULL,                     -- 마일리지가 증감된 회원의 번호 (외래 키)
    LogDate DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP), -- 포인트 증감 발생 날짜
    postid int ,
    FOREIGN KEY (postid) REFERENCES teamboard(postid)
    ON UPDATE CASCADE
    ON DELETE CASCADE ,                        -- 회원 테이블의 외래 키
    FOREIGN KEY (MemberID) REFERENCES members(MemberID)
    ON UPDATE CASCADE
    ON DELETE CASCADE                          -- 회원 테이블의 외래 키
);

-- 댓글 추천로그 테이블
drop table if exists commentlikelog;
CREATE TABLE commentlikelog (
    commentlikelogid INT AUTO_INCREMENT PRIMARY KEY,  -- 마일리지 로그 고유 번호 (기본 키, 자동 증가)
    MemberID INT NOT NULL,                     -- 마일리지가 증감된 회원의 번호 (외래 키)
    LogDate DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP), -- 포인트 증감 발생 날짜
    commentid int ,
    FOREIGN KEY (MemberID) REFERENCES members(MemberID)
    ON UPDATE CASCADE
    ON DELETE CASCADE ,                         -- 회원 테이블의 외래 키
    FOREIGN KEY (commentid) REFERENCES comments(commentid)
    ON UPDATE CASCADE
    ON DELETE CASCADE                          -- 회원 테이블의 외래 키
);

drop table if exists GamePurchaseList;
CREATE TABLE GamePurchaseList (
    ListID INT AUTO_INCREMENT PRIMARY KEY,     -- 게임 구매 목록 고유 번호 (기본 키, 자동 증가)
	PointLogID int ,           -- 포인트로그 (외래키)
    FOREIGN KEY (PointLogID) references PointLogs(PointLogID)  -- 포인트그 테이블의 외래 키
    ON update cascade
    on delete cascade
);

drop table if exists GamePurchaseDetails;
CREATE TABLE GamePurchaseDetails (
    DetailID INT AUTO_INCREMENT PRIMARY KEY,    -- 게임 구매 상세 고유 번호 (기본 키, 자동 증가)
    ListID INT NOT NULL,                       -- 구매 목록 번호 (외래 키)
    MatchID varchar(255) , 						-- 경기목록 고유코드(csv)
	winandloss int NOT NULL ,            -- 회원이 선택한 승패 1 : 승 0 : 패
    matchstate int default 1, -- 경기상태  1 : 경기 정상  0 : 경기취소
    correct int default 0, -- 적중 결과 0: 진행중 1 : 적중 2: 적중실패
    odds double ,
    foreign key(ListID) references GamePurchaseList(ListID)
    on update cascade
    on delete cascade
);

-- 회원접속 로그 테이블
drop table if exists access;
create table access (
	accessid int auto_increment primary key,	-- 접속 로그 번호
    memberid int not null,						-- 멤버 아이디
    memberdatetime datetime not null default now(),	-- 접속 날짜
	foreign key (memberid) references members(memberid)
    on update cascade
    on delete cascade

);

-- 굿즈거래(중고거래) 테이블
drop table if exists market;
create table market (
    mkid int auto_increment not null,  -- 게시글 고유코드
    mktitle varchar(255) not null,  -- 게시글 제목
    mkwriter int,  -- 게시글 작성자
    mkview int not null default 0,  -- 게시글 조회수
    mkdate datetime default now(), -- 게시글 작성날짜
    mkcontent text not null,  -- 게시글 내용
    mkstate tinyint default 0,  -- 거래 상테 (false: 0, 진행중, true: 1, 거래종료)
    primary key (mkid),
    foreign key (mkwriter) references members(memberid) on delete set null
);

-- 굿즈거래 댓글
drop table if exists marketreply;
create table marketreply (
    mkreplyid int auto_increment not null,  -- 댓글 고유번호
    mkreplywriter int,  -- 작성자 memberid
    mkid int not null,  -- 원 게시글 번호
    mkreplydate datetime default now(),  -- 작성된 날짜
    mkreplycontent text not null,  -- 댓글 내용
    primary key (mkreplyid),
    foreign key (mkreplywriter) references members(memberid) on delete set null,
    foreign key (mkid) references market(mkid) on delete cascade
);


-- 굿즈거래 첨부파일 테이블
drop table if exists marketfiles;
create table marketfiles (
    fileid int auto_increment not null,  -- 파일 고유코드
    mkid int not null,  -- 게시글 번호
    filename varchar(255) not null,  -- 첨부파일 이름
    primary key (fileid),
    foreign key (mkid) references market(mkid) on delete cascade
);

drop table if exists bus;
create table bus(
	resno int auto_increment not null,
    gamecode varchar(30) not null,
    restatus int default 0, -- (0:예매완료, 1:예매취소)
    seat int not null,
    PointLogID INT NOT NULL,
    primary key(resno),
    foreign key (PointLogID) references pointlogs(PointLogID)
);