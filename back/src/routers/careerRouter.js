import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
  isValidData,
  invalidCallback,
} from "../middlewares/validationMiddleware";

import { careerService } from "../services/careerService";

const careerRouter = Router();
careerRouter.use(login_required);

careerRouter.post(
  "/career/create",
  isValidData("career"),
  invalidCallback,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const user_id = req.body.user_id;
      const company = req.body.company;
      const job_position = req.body.job_position;
      const achievement = req.body.achievement;
      const from_date = req.body.from_date;
      const to_date = req.body.to_date ?? null;
      const isCurrent = req.body.isCurrent;

      const newCareer = await careerService.addCareer({
        user_id,
        company,
        job_position,
        achievement,
        from_date,
        to_date,
        isCurrent,
      });

      if (newCareer.errorMessage) {
        throw new Error(newCareer.errorMessage);
      }
      res.status(201).json(newCareer);
    } catch (error) {
      next(error);
    }
  }
);

careerRouter.get("/careers/:id", async (req, res, next) => {
  try {
    const career_id = req.params.id;
    const currentCareerInfo = await careerService.getCareerInfo({
      career_id,
    });

    if (currentCareerInfo.errorMessage) {
      throw new Error(currentCareerInfo.errorMessage);
    }

    res.status(200).send(currentCareerInfo);
  } catch (error) {
    next(error);
  }
});

careerRouter.put("/careers/:id", async (req, res, next) => {
  try {
    const career_id = req.params.id;

    const company = req.body.company ?? null;
    const job_position = req.body.job_position ?? null;
    const achievement = req.body.achievement;
    const from_date = req.body.from_date ?? null;
    const to_date = req.body.to_date ?? null;
    const isCurrent = req.body.isCurrent ?? null;

    const toUpdate = { company, job_position, achievement, from_date, to_date, isCurrent };

    const updatedCareer = await careerService.updateCareer({
      career_id,
      toUpdate,
    });

    if (updatedCareer.errorMessage) {
      throw new Error(updatedCareer.errorMessage);
    }
    res.status(200).json(updatedCareer);
  } catch (error) {
    next(error);
  }
});

careerRouter.get("/careerlist/:user_id", async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const careers = await careerService.getCareer({ user_id });
    res.status(200).json(careers);
  } catch (error) {
    next(error);
  }
});


careerRouter.delete("/careerlist/:user_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { user_id } = req.params;
    // userId의 career 데이터를 모두 삭제함
    await careerService.deleteAllCareer({ user_id });

    res.status(204).send('success');
  } catch (error) {
    next(error);
  }
})

careerRouter.delete("/careers/:id", async (req, res, next) => {
  try {
    const career_id = req.params.id;
    const deletedCareer = await careerService.deleteCareer({ career_id });

    if (deletedCareer?.errorMessage) {
      throw new Error(deletedCareer.errorMessage);
    }

    res.status(204).send("성공적으로 삭제가 완료되었습니다.");

  } catch (error) {
    next(error);
  }
});

export { careerRouter };