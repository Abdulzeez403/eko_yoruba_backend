const LessonContent = require("../models/LessonContent");

// CREATE
exports.createLessonContent = async (req, res) => {
  console.log("FILES:", JSON.stringify(req.files, null, 2));
  console.log("BODY:", req.body);

  try {
    const imageUrl =
      req.files && req.files["image"] ? req.files["image"][0].path : "";
    const audioUrl =
      req.files && req.files["audio"] ? req.files["audio"][0].path : "";

    const contentData = {
      ...req.body,
      imageUrl,
      audioUrl,
      image: imageUrl, // legacy
      audio: audioUrl, // legacy
    };

    const content = await LessonContent.create(contentData);
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    console.error("CREATE LESSON CONTENT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL CONTENT
exports.getAllLessonContent = async (req, res) => {
  try {
    const content = await LessonContent.find().populate("lessonId");
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET CONTENT BY LESSON ID
exports.getLessonContentByLesson = async (req, res) => {
  console.log(req.params.lessonId, "lesson id in controller");
  try {
    const content = await LessonContent.find({ lessonId: req.params.lessonId });
    console.log(content, "the content by lesson id");
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE CONTENT
exports.getSingleLessonContent = async (req, res) => {
  try {
    const content = await LessonContent.findById(req.params.id);
    if (!content)
      return res.status(404).json({ success: false, message: "Not found.." });
    console.log(content, "the content");

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
exports.updateLessonContent = async (req, res) => {
  try {
    const imageUrl =
      req.files && req.files["image"] ? req.files["image"][0].path : "";
    const audioUrl =
      req.files && req.files["audio"] ? req.files["audio"][0].path : "";

    const updateData = { ...req.body };
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
      updateData.image = imageUrl;
    }
    if (audioUrl) {
      updateData.audioUrl = audioUrl;
      updateData.audio = audioUrl;
    }

    const updated = await LessonContent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("UPDATE LESSON CONTENT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
exports.deleteLessonContent = async (req, res) => {
  try {
    const deleted = await LessonContent.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
