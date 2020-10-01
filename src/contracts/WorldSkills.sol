pragma solidity <=0.7.0;
//контракт не более 256 строк
contract WorldSkills {
    struct User {//Пользователи
        address adr;//solidity адрес
        string name;// Имя
        string homeadr;//Физический адрес
        string role;//Роль
    }
    struct Admin {// Администраторы
        address adr;//solidity адрес
        string name;// Имя
        string homeadr;//Физический адрес
        string role;//Роль
        bool main;//Главный админ или нет
    }
    struct Worker {//Сотрудники
        address adr;//solidity адрес
        string name;// Имя
        string homeadr;//Физический адрес
        string role;//Роль
        string id;//Id сотрудника
    }
    struct Place {//Почтовые отделения
        string name;
        uint32 index;
        address payable placeadr;
    }
    struct Mail {//Почтовое отправление
        string trek;//Трек номер
        address payable mailsender;// solidity адрес отправителя
        address payable mailreceiver;//solidity адрес получателя
        string mailtype;// Тип отправления
        uint class;// класс
        uint time;// Время доставки
        uint deliverycost;//Стоимость за доставку
        uint weight;// Вес отправления
        uint decvalue;// Объявленная ценность
        uint fullcost;// Итого
        string sendadr;// Физический адрес отправителя
        string recadr;//Физический адрес получателя

        uint finishweight;
        bool paid; //статус оплаты
        bool delivered;//Статус доставки
        bool finished;//Статус получения
        bool weightdiff;// Слишком ли большая разница в весе
        bool DeliveredLate;
    }
    struct Transfer {//денежные переводы
        address payable sender;// solidity адрес отправителя
        address payable receiver;//solidity адрес получателя
        uint sum;// Сумма
        uint time;// Время жизни денежного перевода
    }
    struct Transit {// Информация о посылки на контрольных точках
        string worker;// Работник заполняющий информацию о посылке
        string trek;
        uint weight;
        uint index;// Индекс почтового отделения
    }
    User[] users;
    Admin[] admins;
    Worker[] workers;
    Place[] places;
    Mail[] mails;
    Transfer[] transfers;
    Transit[] transitpoints;
    uint public globalMailCount = 0;
    uint MailCount = 0;
    address MainAdmin = msg.sender; // Адрес главного админа
    address defaultAdr = 0x0000000000000000000000000000000000000000;// Стандартный адрес
    mapping (address => uint) RoleCheck; // мапинг хранящий цифры соответствующие роли человека
    mapping (address => string) WorkAdrToName;// мапинг присваюващий солидити адресу работника его имя
    mapping (string => uint) TimeToDeliver;// Мапинг считающий время до которого необходимо доставить посылку
    mapping (string => uint) TimetoReceive;// Мапинг считающий время до которго необходимо получить посылку
    mapping (string => uint) MailDestination; //Куда идет посылка
    mapping (string => uint) TrekToId;
    mapping (uint => uint) TransferLifeTime;
    mapping (string => address payable) AddressToPay;
    mapping (uint => address payable) MailIndexToAddress;
    constructor () public {
        admins.push(Admin(msg.sender, "Александр", "Никитина 85", "Главный админ", true));
        places.push(Place("Ростов-на-Дону", 344000,0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db));RoleCheck[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = 4;MailIndexToAddress[344000] = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
        places.push(Place("Таганрог(главное отделение)", 347900,0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB));RoleCheck[0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB] = 4;MailIndexToAddress[347900] = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
        places.push(Place("Таганрог (Почтамт №1)", 347935,0x617F2E2fD72FD9D5503197092aC168c91465E7f2));RoleCheck[0x617F2E2fD72FD9D5503197092aC168c91465E7f2] = 4;MailIndexToAddress[347935] =0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
        places.push(Place("Таганрог (Почтамт №2)", 347913,0x17F6AD8Ef982297579C203069C1DbfFE4348c372));RoleCheck[0x17F6AD8Ef982297579C203069C1DbfFE4348c372] = 4;MailIndexToAddress[347913] =0x17F6AD8Ef982297579C203069C1DbfFE4348c372;
        places.push(Place("Таганрог (Почтамт №3)", 347928,0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678));RoleCheck[0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678] = 4;MailIndexToAddress[347928] =0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678;
        places.push(Place("Новочеркасск (главное отделение)", 346400,0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7));RoleCheck[0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7] = 4;MailIndexToAddress[346400] =0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7;
        places.push(Place("Новочеркасск (Почтамт №1)", 346424,0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C));RoleCheck[0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C] = 4;MailIndexToAddress[346424] =0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C;
        places.push(Place("Новочеркасск (Почтамт №2)", 346414,0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC));RoleCheck[0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC] = 4;MailIndexToAddress[346414] =0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC;
        places.push(Place("Новочеркасск (Почтамт №3)", 346448,0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c));RoleCheck[0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c] = 4;MailIndexToAddress[346448] =0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    }
    function resetCount() public {
        MailCount = 0;
    }
    function AddAdmin(address adr,string memory name,string memory homeadr) public {
        require(msg.sender == MainAdmin, "Вы не главный админ");
        require(RoleCheck[adr] == 0, "Админ с данным адресом уже существует");
        admins.push(Admin(adr, name, homeadr, "Администратор", false));
        RoleCheck[adr] = 1;
    }
    function AddWorker(address adr, string memory name, string memory homeadr, string memory Id) public {
        require(RoleCheck[msg.sender] == 1, "Вы не админ");
        require(RoleCheck[adr] == 0, "Админ с данным адресом уже существует");
        workers.push(Worker(adr, name, homeadr,"Сотрудник",Id));
        RoleCheck[adr] = 2;
        WorkAdrToName[adr] = name;
    }
    function UserRegister(string memory name, string memory homeadr) public {
        require(RoleCheck[msg.sender] == 0, "Вы уже зарегистрированы");
        users.push(User(msg.sender, name, homeadr, "Пользователь"));
        RoleCheck[msg.sender] = 3;
    }
    function CreateMail(string memory trek, address payable sender, address payable receiver, uint startpostindex, uint endpostindex, string memory mailtype, uint class,//postindex присылает интерфейс
        uint weight, uint decvalue, string memory sendadr, string memory recadr) public {
        MailCount++;//Тут сказать олегу
        globalMailCount++;
        // require (RoleCheck[msg.sender] == 2, "Вы не являетесь работником");
        // require (weight > 0);
        // require (weight < 10);
        mails.push(Mail(trek, sender, receiver, mailtype, class, (class * 5) + 5, 7 - (2*class), weight, decvalue, ((7 - (2*class))*weight) + (decvalue * 2), sendadr, recadr,0,false,false,false,false,false));// делим на 10
        TrekToId[trek] = mails.length-1;
        AddressToPay[trek] = MailIndexToAddress[startpostindex];
        MailDestination[trek] = endpostindex;
        TimeToDeliver[trek] = now + ((class * 5) + 5) * 86400;
    }


    function getUser(uint index) public view returns(uint, uint) {
        return (mails[index].class, mails[index].time);
    }

    function payForMail(string memory trek) public payable {
        require(mails[TrekToId[trek]].mailsender == msg.sender);
        require(msg.value == (mails[TrekToId[trek]].fullcost)/10);
        mails[TrekToId[trek]].paid == true;
    }
    function CreateTranzitPoint(string memory trek, uint index, uint weight) public {
        require(RoleCheck[msg.sender] == 2, "Вы не являетесь работником");
        transitpoints.push(Transit(WorkAdrToName[msg.sender], trek, weight, index));
        if (index == MailDestination[trek]) {
            mails[TrekToId[trek]].delivered = true;
            mails[TrekToId[trek]].finishweight = weight;
            UserNotification(trek);
            if (TimeToDeliver[trek] < now) {
                NotDeliveredInTime(trek);
            }
        }

    }
    function UserNotification(string memory trek) public {
        require(mails[TrekToId[trek]].delivered == true);
        TimetoReceive[trek] = now + (14*86400);
        if(((mails[TrekToId[trek]].weight - mails[TrekToId[trek]].finishweight)*100) < mails[TrekToId[trek]].weight * 15) {
            mails[TrekToId[trek]].weightdiff = true;
        }
    }
    function NotReceived(string memory trek, uint mail_id) public {
        require(TimetoReceive[trek] < now, "Time do not come yet");
        mails[mail_id].finished = true;
    }
    function NotDeliveredInTime(string memory trek) public payable {
        require(TimeToDeliver[trek] < now, "Time is not over");
        mails[TrekToId[trek]].DeliveredLate = true;
        if (mails[TrekToId[trek]].class == 1) {
            mails[TrekToId[trek]].mailsender.transfer(mails[TrekToId[trek]].fullcost);
        }
        else if (mails[TrekToId[trek]].class == 2) {
            mails[TrekToId[trek]].mailsender.transfer(mails[TrekToId[trek]].deliverycost*5 + mails[TrekToId[trek]].decvalue * 2);// делим на 10
        }
        else {
            mails[TrekToId[trek]].mailsender.transfer(mails[TrekToId[trek]].decvalue);
        }
    }
    function refuseMail(string memory trek) public {
        require(mails[TrekToId[trek]].delivered == true);
        require(msg.sender == mails[TrekToId[trek]].mailreceiver);
        if (mails[TrekToId[trek]].weightdiff == true) {
            if(mails[TrekToId[trek]].DeliveredLate == true) {
                if (mails[TrekToId[trek]].class == 2) {
                    mails[TrekToId[trek]].mailsender.transfer(mails[TrekToId[trek]].deliverycost/2);
                }
                else if (mails[TrekToId[trek]].class == 3) {
                    mails[TrekToId[trek]].mailsender.transfer(mails[TrekToId[trek]].deliverycost);
                }
            }
            else {
                mails[TrekToId[trek]].mailsender.transfer(mails[TrekToId[trek]].fullcost);
            }
        }
        mails[TrekToId[trek]].finished = true;
    }
    function acceptMail(string memory trek) public payable {
        require(mails[TrekToId[trek]].delivered == true);
        require(msg.sender == mails[TrekToId[trek]].mailreceiver);
        AddressToPay[trek].transfer(mails[TrekToId[trek]].fullcost);
        mails[TrekToId[trek]].finished = true;
    }
    function createTransfer(address payable receiver, uint time) public payable {
        transfers.push(Transfer(msg.sender, receiver, msg.value, time));
        TransferLifeTime[transfers.length-1] = now + time * 86400;
    }
    function acceptTransfer(uint transfer_id) public payable {
        require(msg.sender == transfers[transfer_id].receiver, "Денежки не вам");
        transfers[transfer_id].receiver.transfer(transfers[transfer_id].sum);
    }
    function refuseTransfer(uint transfer_id) public payable {
        require(msg.sender == transfers[transfer_id].receiver, "Денежки не вам");
        transfers[transfer_id].sender.transfer(transfers[transfer_id].sum);
    }
}

