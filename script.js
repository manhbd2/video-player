(function () {
  window.onload = function () {
    class pLoader extends Hls.DefaultConfig.loader {
      constructor(config) {
        super(config || {});
        const load = this.load.bind(this);
        this.load = function (context, config, callbacks) {
          alert(context.url);
          if (/\.m3u8$/.test(context.url.split("?")[0])) {
            const onSuccess = callbacks.onSuccess;
            callbacks.onSuccess = function (
              response,
              stats,
              context,
              networkDetails
            ) {
              response.data = process(response.data);
              onSuccess(response, stats, context, networkDetails);
            };
          }
          load(context, config, callbacks);
        };
      }
    }

    function rc4(str, key) {
      const s = [];
      let j = 0,
        x,
        output = "";

      let i;

      for (i = 0; i < 256; i++) {
        s[i] = i;
      }

      for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
      }

      i = 0;
      j = 0;

      for (let y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        output += String.fromCharCode(
          str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]
        );
      }

      return output;
    }

    function process(content) {
      if (content.includes("#EXTM3U")) {
        return content;
      }

      return rc4(atob(content), "DFKykVC3c1");
    }

    alert("init 3");

    const config = {
      cast: {},
      hlshtml: true,
      height: "100%",
      key: "XSuP4qMl+9tK17QNb+4+th2Pm9AWgMO/cYH8CI0HGGr7bdjo",
      playbackRateControls: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2, 4],
      playlist: [
        {
          sources: [
            {
              file: "https://v1.lightningbolts.ru/_v27/ByMQegQzAy8tJCUiKg4xISwfcXgRMwcvEx4meioRHzktIiENEwEPOx4OEz4cLg.m3u8?code=KAEbeSoBBH8FMHAmEB4lOiseJTMtDQR7BScLMCswcCQoHjElBCBwJSgjLTEtHiV7GgwHIioePRATJwsaGgwTORoeIQQoHxM_HQ45Cwd6EDMfHwN5KHkDER4dIQITAQ8dKgEmMxwdHDEQJx84HyUhKB8iHx0HeAN6Kg0fPxsdHyYHDCUDECMYMBt7MREQIiECLyQHGh4jJQMteS0oHg58fBN6HxwQIyUjKCQlDxoeDx8TJQAxG3gPHCwfIQ8GDSUAH3gPBxAlLSgoMwsKECUTfwQcfDAEHS17GHobPxMkeHsbDxMEGyMfOS0zAHsfJzk7HCchAR4gPXkaHngBG3ghIiwRCHkeDhszLXoqcAV7BwEsDiElH3ohPhAzBxstHgMcHSMPGRgdeXAFJHkzLR0hcSgBG3kqAQR_BTBweygeGyUregd5KiB8PBMRGA&hash=BCQMPgQjOSMHewR_BDMMMRMdJnkEHQg-BiQAMQQzCH8HDQshBw0mfBAdHDMGJBh7Bh0M",
            },
          ],
        },
      ],
      preload: "auto",
      primary: "html5",
      width: "100%",
      hlsjsConfig: {
        loader: pLoader,
      },
    };

    $("main").children().remove();
    $("main").append('<div id="player"></div>');
    jwPlayer = jwplayer("player").setup(config);

    jwPlayer
      .on("ready", function () {
        alert("ready");
      })
      .on("firstFrame", function () {
        alert("first frame");
      })
      .on("error", function (e) {
        alert(`error`);
      })
      .on("setupError", function (e) {
        alert(`setup error`);
      });
  };
})();
