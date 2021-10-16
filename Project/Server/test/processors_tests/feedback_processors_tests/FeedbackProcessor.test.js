const {
  FeedbackProcessor,
} = require("../../../app/processors/processorsContainer");
const {
  NotValidError,
  NotExistError,
} = require("../../../app/errors/errorsContainer");

// Kiểm tra các api end-point của phản hồi

//#region INIT

class FeedBackValidatorMock {
  validateFeedback = jest.fn((fb) => {
    return {
      hasAnyError: fb === undefined,
    };
  });

  validateFeedbackNo = jest.fn((no) => {
    return {
      hasAnyError: isNaN(no),
    };
  });

  validateProductNo = jest.fn((no) => {
    return {
      hasAnyError: isNaN(no),
    };
  });
}

const FEEDBACK = [
  { fb: 1, date: new Date("2021-09-24") },
  { fb: 2, date: new Date() },
];

class FeedbackDAOMock {
  getFeedback = jest.fn(async () => FEEDBACK);

  getFeedbackByNo = jest.fn(async (no) => {
    if (no === 1) {
      return FEEDBACK[0];
    }

    throw new NotExistError();
  });

  getFeedbackByProductNo = jest.fn(async (prod_no) => {
    if (prod_no == 1) {
      return FEEDBACK;
    }

    throw new NotExistError();
  });

  getSubFeedback = jest.fn(async () => FEEDBACK);

  addFeedback = jest.fn(async () => ({ fb_no: FEEDBACK.length + 1 }));

  deleteFeedback = jest.fn();
}

//#endregion

let validatorMock;
let daoMock;
function getProcessor() {
  return new FeedbackProcessor(validatorMock, daoMock);
}

describe("Proc Lấy danh sách phản hồi", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
  });

  test("Không query params - 200", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const processor = getProcessor();

    const query = {};

    //Act
    const expRes = { items: feedback };
    const actRes = await processor.getFeedback(query);

    //Expect
    expect(actRes).toEqual(expRes);
  });
});

describe("Proc Lấy danh sách phản hồi của sản phẩm", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
  });

  test("Mã không hợp lệ - EX", async () => {
    //Arrange
    const prod_no = undefined;
    const query = {};
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getFeedbackByProductNo(prod_no, query);
    } catch (error) {
      actRs = error;
    }
    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProductNo).toBeCalledTimes(1);
  });

  test("Sản phẩm không tồn tại - EX", async () => {
    //Arrange
    const prod_no = "3";
    const query = {};
    const processor = getProcessor();

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getFeedbackByProductNo(prod_no, query);
    } catch (error) {
      actRs = error;
    }
    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateProductNo).toBeCalledTimes(1);
  });

  test("Lấy ra phản hồi của 1 sản phẩm", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const prod_no = "1";
    const processor = getProcessor();

    //Act
    const expRs = { items: feedback };
    const actRs = await processor.getFeedbackByProductNo(prod_no, {});

    //Expect
    expect(actRs).toEqual(expRs);
    expect(validatorMock.validateProductNo).toBeCalledTimes(1);
  });
});

describe("Proc Lấy danh sách trả lời của 1 phản hồi", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
  });

  test("Danh sách trả lời không hợp lệ - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const fb_no = undefined;
    const query = {};

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.getSubFeedback(fb_no, query);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
  });

  test("Phản hồi không tồn tại - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const fb_no = "5";
    const query = {};

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.getSubFeedback(fb_no, query);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
  });

  test("Lấy danh sách trả lời phản hồi của phản hồi - 200", async () => {
    //Arrange
    const feedback = FEEDBACK;
    const processor = getProcessor();
    const fb_no = "1";

    //Act
    const expRes = { items: feedback };
    const actRes = await processor.getSubFeedback(fb_no, {});

    //Expect
    expect(actRes).toEqual(expRes);
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
    expect(daoMock.getSubFeedback).toBeCalledTimes(1);
  });
});

describe("Proc Thêm phản hồi", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
  });

  test("Phản hồi không hợp lệ - EX", async () => {
    //Arrange
    const prod_no = 1;
    const feedback = undefined;
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.addFeedback(prod_no, feedback);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateFeedback).toBeCalledTimes(1);
  });

  test("Thêm thành công", async () => {
    //Arrange
    const prod_no = 1;
    const feedback = {};
    const processor = getProcessor();

    //Act
    const expRes = { fb_no: FEEDBACK.length + 1 };
    const actRes = await processor.addFeedback(prod_no, feedback);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(validatorMock.validateFeedback).toBeCalledTimes(1);
    expect(daoMock.addFeedback).toBeCalledTimes(1);
  });
});

describe("Proc Thêm trả lời phản hồi", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
  });

  test("Phản hồi không hợp lệ - EX", async () => {
    //Arrange
    const prod_no = 1;
    const feedback = undefined;
    const processor = getProcessor();

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.addFeedback(prod_no, feedback);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateFeedback).toBeCalledTimes(1);
  });

  test("Thêm thành công", async () => {
    //Arrange
    const prod_no = 1;
    const feedback = {};
    const processor = getProcessor();

    //Act
    const expRes = { fb_no: FEEDBACK.length + 1 };
    const actRes = await processor.addFeedback(prod_no, feedback);

    //Expect
    expect(actRes).toEqual(expRes);
    expect(validatorMock.validateFeedback).toBeCalledTimes(1);
    expect(daoMock.addFeedback).toBeCalledTimes(1);
  });
});

describe("Proc Xóa phản hồi", () => {
  beforeEach(() => {
    validatorMock = new FeedBackValidatorMock();
    daoMock = new FeedbackDAOMock();
  });

  test("Mã không hợp lệ - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const fb_no = undefined;

    //Act
    const expRs = NotValidError;
    let actRs;
    try {
      await processor.deleteFeedback(fb_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    console.log(actRs);
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
  });

  test("Không tồn tại - EX", async () => {
    //Arrange
    const processor = getProcessor();
    const fb_no = "2";

    //Act
    const expRs = NotExistError;
    let actRs;
    try {
      await processor.deleteFeedback(fb_no);
    } catch (error) {
      actRs = error;
    }

    //Expect
    expect(actRs instanceof expRs).toBeTruthy();
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);
  });

  test("Xóa thành công", async () => {
    //Arrange
    const fb_no = "1";
    const processor = getProcessor();

    //Act
    await processor.deleteFeedback(fb_no);

    //Expect
    expect(validatorMock.validateFeedbackNo).toBeCalledTimes(1);

    expect(daoMock.deleteFeedback).toBeCalledTimes(1);
  });
});
